using EthereumBasedFileStorage.Services.Models;

namespace EthereumBasedFileStorage.Services
{
    public interface IFileStorageService
    {
        public File[] GetFiles(int[] fileIds);
        File StoreFile(string fileName, byte[] content);
    }
}
