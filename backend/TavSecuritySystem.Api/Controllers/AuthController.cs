using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TavSecuritySystem.Api.Models.Dtos;
using TavSecuritySystem.Api.Services;

namespace TavSecuritySystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService _authService;

    public AuthController(IAuthenticationService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LoginResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Login([FromBody] LoginRequestDto request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var response = _authService.Login(request);

        if (!response.Success)
            return Unauthorized(response);

        return Ok(response);
    }

    [HttpGet("validate")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult ValidateToken()
    {
        var username = User.FindFirst("username")?.Value ?? User.Identity?.Name;
        if (string.IsNullOrEmpty(username))
            return Unauthorized(new { message = "Invalid or missing token" });

        return Ok(new { message = "Token is valid", username });
    }
}
