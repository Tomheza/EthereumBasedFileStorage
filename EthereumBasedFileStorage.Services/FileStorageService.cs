using System;
using System.Globalization;
using System.Linq;
using EthereumBasedFileStorage.Services.Models;
using EthereumBasedFileStorage.Storage;

namespace EthereumBasedFileStorage.Services
{
    public class FileStorageService : IFileStorageService
    {
        public File[] GetFiles()
        {
            using var dbContext = new FileStorageContext();
            return dbContext.Files.ToArray().Select(f => new Models.File
            {
                FileName = f.FileName,
                Modified = f.Modified.ToString(CultureInfo.InvariantCulture),
            }).ToArray();
        }

        public File StoreFile(string fileName, byte[] content)
        {
            using var dbContext = new FileStorageContext();
            var file = new Storage.Models.File
            {
                FileName = fileName,
                Added = DateTime.Now,
                Content = content,
                Modified = DateTime.Now
            };

            dbContext.Files.Add(file);

            dbContext.SaveChanges();

            return new File()
            {
                Id = file.Id,
                FileName = fileName,
            };
        }
    }
}
