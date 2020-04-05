using System.IO;
using EthereumBasedFileStorage.Services;
using Microsoft.AspNetCore.Mvc;

namespace EthereumBasedFileStorage.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : Controller
    {
        private readonly IFileStorageService fileStorageService;

        public FileController(IFileStorageService fileStorageService)
        {
            this.fileStorageService = fileStorageService;
        }

        [HttpGet]
        public Services.Models.File[] GetFiles()
        {
            return fileStorageService.GetFiles();
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
            var fileName = file.FileName;


            var storedFile = fileStorageService.StoreFile(fileName, fileBytes);
            //_fileStorageService.

            
        }
    }
}
