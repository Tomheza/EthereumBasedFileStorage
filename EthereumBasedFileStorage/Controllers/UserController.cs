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
            var authenticatedUserTokens = userService.Login(user);

            if (authenticatedUserTokens != null)
            {
                return Ok(new
                {
                    accessToken = authenticatedUserTokens.AccessToken,
                    refreshToken = authenticatedUserTokens.RefreshToken
                });
            }

            return BadRequest("User does not exist");
        }
    }
}
