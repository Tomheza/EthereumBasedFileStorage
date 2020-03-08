using System;
using System.IO;
using EthereumBasedFileStorage.Services;
using EthereumBasedFileStorage.Storage;
using Microsoft.AspNetCore.Mvc;

namespace EthereumBasedFileStorage.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : Controller
    {
        private readonly IFileStorageService _fileStorageService;

        public FileController(IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }

        [HttpGet]
        public void GetFiles()
        {
            var files = _fileStorageService.GetFiles();

          
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

            await using var dbContext = new FileStorageContext();
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
}
