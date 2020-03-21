using EthereumBasedFileStorage.Services.Models;

namespace EthereumBasedFileStorage.Services
{
    public interface IFileStorageService
    {
        public File[] GetFiles();
    }
}
