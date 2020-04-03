using EthereumBasedFileStorage.Services.Models;

namespace EthereumBasedFileStorage.Services
{
    public interface IUserService
    {
        Token Register(User user);
        Token Login(User user);
        Token GetNewTokenOrDefault(Token token);
    }
}
