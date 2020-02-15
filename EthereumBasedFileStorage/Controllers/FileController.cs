using System.IO;
using System.Linq;
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
            var directory = new DirectoryInfo(@"C:\Users\zemgt\Downloads");
            var files = directory.GetFiles();

            return files.Select(f => new File
            {
                Name = f.Name,
                DirectoryName = f.DirectoryName
            }).ToArray();
        }
    }

    public class File
    {
        public string Name { get; set; }
        public string DirectoryName { get; set; }
    }
}
