using System.IO;
using System.Threading.Tasks;
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
        public async Task<Services.Models.File> UploadFile()
        {
            if (Request.Form.Files.Count == 0)
                return null;

            var file = Request.Form.Files[0];

            if (!(file?.Length > 0)) 
                return null;

            await using var ms = new MemoryStream();
            await file.CopyToAsync(ms);

            var storedFile = fileStorageService.StoreFile(file.FileName, ms.ToArray());
            return storedFile;
        }
    }
}
