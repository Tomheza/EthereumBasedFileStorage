using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using EthereumBasedFileStorage.Services.Helpers;
using EthereumBasedFileStorage.Services.Models;
using EthereumBasedFileStorage.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EthereumBasedFileStorage.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration config;

        public UserService(IConfiguration config)
        {
            this.config = config;
        }

        public Storage.Models.User Register(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username))
            {
                throw new AppException("Password is required");
            }

            if (string.IsNullOrWhiteSpace(user.Password))
            {
                throw new AppException("Password is required");
            }

            using var dbContext = new FileStorageContext();

            if (dbContext.Users.ToList().Any(x => x.Username == user.Username))
            {
                throw new AppException("Username \"" + user.Username + "\" is already taken");
            }

            CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var databaseUser = new Storage.Models.User
                { Username = user.Username, PasswordHash = passwordHash, PasswordSalt = passwordSalt };
            dbContext.Users.Add(databaseUser);
            dbContext.SaveChanges();

            return databaseUser;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            }

            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public Token Login(User user)
        {
            var dbUser = Authenticate(user);

            if (dbUser == null) 
                return null;

            var accessToken = GenerateAccessToken(user);
            var refreshToken = GenerateRefreshToken();
            SaveRefreshToken(refreshToken, user);

            return new Token(new JwtSecurityTokenHandler().WriteToken(accessToken), refreshToken);
        }

        private static void SaveRefreshToken(string token, User user)
        {
            using var dbContext = new FileStorageContext();
            var dbUser = dbContext.Users.FirstOrDefault(u => u.Username == user.Username);

            if (dbUser == null)
                return;

            dbUser.RefreshToken = token;
            dbContext.SaveChanges();
        }

        public Storage.Models.User Authenticate(User user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return null;
            }

            using var dbContext = new FileStorageContext();
            var databaseUser = dbContext.Users.FirstOrDefault(x => x.Username == user.Username);

            if (databaseUser == null)
            {
                return null;
            }

            return !VerifyPasswordHash(user.Password, databaseUser.PasswordHash, databaseUser.PasswordSalt) ? null : databaseUser;
        }

        private JwtSecurityToken GenerateAccessToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                config["Tokens:Issuer"],
                config["Tokens:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(10),
                signingCredentials: credentials);
            return token;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            }

            if (storedHash.Length != 64)
            {
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));
            }

            if (storedSalt.Length != 128)
            {
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).",
                    nameof(storedHash));
            }

            using (var hmac = new HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
