using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using EthereumBasedFileStorage.Services.Helpers;
using EthereumBasedFileStorage.Services.Models;
using EthereumBasedFileStorage.Storage;
using Microsoft.Extensions.Configuration;

namespace EthereumBasedFileStorage.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _config;

        public UserService(IConfiguration config)
        {
            _config = config;
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
    }
}
