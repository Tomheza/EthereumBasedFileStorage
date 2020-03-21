﻿using System.Globalization;
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
    }
}