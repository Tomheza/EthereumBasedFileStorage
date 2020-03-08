using System;
using System.Globalization;
using System.IO;
using System.Linq;
using EthereumBasedFileStorage.Storage;
using Microsoft.AspNetCore.Mvc;

namespace EthereumBasedFileStorage.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : Controller
    {
        [HttpGet]
        public File[] GetFiles()
        {
            using FileStorageContext dbContext = new FileStorageContext();
            return dbContext.Files.ToList().Select(f => new File
            {
                Name = f.FileName,
                Modified = f.Modified.ToString(CultureInfo.InvariantCulture),
                User = "Tomheza"
            }).ToArray();
        }

        [HttpPost]
        [Route("upload")]
        public async void UploadFile()
        {
            var file = Request.Form.Files[0];

            if (!(file?.Length > 0)) 
                return;

            await using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            var fileBytes = ms.ToArray();

            await using FileStorageContext dbContext = new FileStorageContext();
            dbContext.Files.Add(new Storage.File
            {
                Id = Guid.NewGuid(),
                FileName = file.FileName,
                Added = DateTime.Now,
                Content = fileBytes,
                Modified = DateTime.Now
            });

            dbContext.SaveChanges();
        }
    }

    public class File
    {
        public string Name { get; set; }
        public string DirectoryName { get; set; }
        public string Modified { get; set; }
        public string User { get; set; }
    }
}
