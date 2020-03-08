using System.Linq;
using EthereumBasedFileStorage.Storage;

namespace EthereumBasedFileStorage.Services
{
    public class FileStorageService : IFileStorageService
    {
        public File[] GetFiles()
        {
            using var dbContext = new FileStorageContext();
            return dbContext.Files.ToArray().Select(f => new File
            {
                //Name = f.FileName,
                //Modified = f.Modified.ToString(CultureInfo.InvariantCulture),
                //User = "Tomheza"
            }).ToArray();

        }
    }
}
