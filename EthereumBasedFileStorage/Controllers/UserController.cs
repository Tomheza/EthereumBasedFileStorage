using EthereumBasedFileStorage.Services;
using EthereumBasedFileStorage.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace EthereumBasedFileStorage.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(User user)
        {
            var registeredUser = userService.Register(user);

            if (registeredUser == null)
            {
                return BadRequest("User already exists");
            }

            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(User user)
        {
            var authenticatedUserToken = userService.Login(user);

            if (authenticatedUserToken != null)
            {
                return Ok(new
                {
                    username = authenticatedUserToken.Username,
                    accessToken = authenticatedUserToken.AccessToken,
                    refreshToken = authenticatedUserToken.RefreshToken
                });
            }

            return BadRequest("User does not exist");
        }
    }
}
