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

        public Token Register(User user)
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
                {Username = user.Username, PasswordHash = passwordHash, PasswordSalt = passwordSalt};
            dbContext.Users.Add(databaseUser);
            dbContext.SaveChanges();

            var token = Login(user);

            return token;
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

            return new Token(dbUser.Id, dbUser.Username, new JwtSecurityTokenHandler().WriteToken(accessToken), refreshToken);
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

            return !VerifyPasswordHash(user.Password, databaseUser.PasswordHash, databaseUser.PasswordSalt)
                ? null
                : databaseUser;
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
                expires: DateTime.Now.AddMinutes(30),
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

        public Token GetNewTokenOrDefault(Token token)
        {
            var principal = GetPrincipalFromTokenOrDefault(token.AccessToken);

            if (principal == null)
                return null;

            var username = principal.Identity.Name;
            var savedRefreshToken = GetRefreshToken(username);

            if (savedRefreshToken != token.RefreshToken)
            {
                return null;
            }

            var newAccessToken = RefreshAccessToken(principal.Claims);
            var newRefreshToken = GenerateRefreshToken();

            // TODO There's 3 times that I create db context in a row, fix that.

            using var dbContext = new FileStorageContext();
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
                return null;

            DeleteRefreshToken(username, token.RefreshToken);
            SaveRefreshToken(username, newRefreshToken);

            return new Token(user.Id, username, newAccessToken, newRefreshToken);
        }

        private string RefreshAccessToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                config["Tokens:Issuer"],
                config["Tokens:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static string GetRefreshToken(string username)
        {
            using var dbContext = new FileStorageContext();
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);

            return user != null ? user.RefreshToken : string.Empty;
        }

        private static void DeleteRefreshToken(string username, string refreshToken)
        {
            using var dbContext = new FileStorageContext();
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
                return;

            if (refreshToken != user.RefreshToken)
            {
                throw new SecurityTokenException("Wrong refresh token");
            }

            user.RefreshToken = null;
            dbContext.SaveChanges();
        }

        private static void SaveRefreshToken(string username, string newRefreshToken)
        {
            using var dbContext = new FileStorageContext();
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
                return;

            user.RefreshToken = newRefreshToken;
            dbContext.SaveChanges();
        }

        private ClaimsPrincipal GetPrincipalFromTokenOrDefault(string accessToken)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"])),
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            ClaimsPrincipal principal;

            try
            {
                principal = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out securityToken);
            }
            catch
            {
                return null;
            }

            if (!(securityToken is JwtSecurityToken jwtSecurityToken) || !jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha512,
                StringComparison.InvariantCultureIgnoreCase))
            {
                return null;
            }

            return principal;
        }
    }
}