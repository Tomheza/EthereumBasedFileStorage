using EthereumBasedFileStorage.Services.Models;

namespace EthereumBasedFileStorage.Services
{
    public interface IUserService
    {
        Storage.Models.User Register(User user);
        Token Login(User user);
    }
}
