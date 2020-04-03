using System.Net.Http;
using EthereumBasedFileStorage.Services;
using EthereumBasedFileStorage.Services.Models;
using Microsoft.AspNetCore.Http;
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
            var registeredUserToken = userService.Register(user);

            if (registeredUserToken == null)
            {
                return BadRequest("User already exists");
            }

            return Ok(registeredUserToken);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(User user)
        {
            var authenticatedUserToken = userService.Login(user);

            if (authenticatedUserToken != null)
            {
                return Ok(authenticatedUserToken);
            }

            return BadRequest("User does not exist");
        }

        [HttpPost]
        [Route("refreshToken")]
        public IActionResult Refresh(Token token)
        {
            var newToken = userService.GetNewTokenOrDefault(token);

            if (newToken != null)
            {
                return Ok(newToken);
            }

            return BadRequest("Token couldn't be refreshed, try logging in.");
        }
    }
}
