﻿using System.IO;
using EthereumBasedFileStorage.Services;
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
        public Services.Models.File[] GetFiles()
        {
            return _fileStorageService.GetFiles();
        }

        [HttpPost]
        [Route("upload")]
        public async void UploadFile()
        {
            if (Request.Form.Files.Count == 0)
                return;

            var file = Request.Form.Files[0];

            if (!(file?.Length > 0)) 
                return;

            await using var ms = new MemoryStream();
            await file.CopyToAsync(ms);

            var fileBytes = ms.ToArray();


            //_fileStorageService.

            //await using var dbContext = new FileStorageContext();
            //dbContext.Files.Add(new File
            //{
            //    Id = Guid.NewGuid(),
            //    FileName = file.FileName,
            //    Added = DateTime.Now,
            //    Content = fileBytes,
            //    Modified = DateTime.Now
            //});

            //dbContext.SaveChanges();
        }
    }
}
