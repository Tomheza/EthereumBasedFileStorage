using EthereumBasedFileStorage.Storage;

namespace EthereumBasedFileStorage.Services
{
    public interface IFileStorageService
    {
        public File[] GetFiles();
    }
}
