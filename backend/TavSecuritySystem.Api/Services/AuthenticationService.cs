using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TavSecuritySystem.Api.Models.Dtos;

namespace TavSecuritySystem.Api.Services;

public interface IAuthenticationService
{
    LoginResponseDto Login(LoginRequestDto request);
    string GenerateJwtToken(string username, string role);
}

public class AuthenticationService : IAuthenticationService
{
    private readonly IConfiguration _configuration;
    private readonly string _jwtSecret;
    private readonly string _jwtIssuer;
    private readonly string _jwtAudience;

    // Mock user database - in production, use actual database
    private static readonly Dictionary<string, (string password, string role)> MockUsers = new()
    {
        { "admin.test", ("password123", "system-admin") },
        { "hse.test", ("password123", "hse-admin") },
        { "hr.test", ("password123", "hr-manager") },
        { "medic.test", ("password123", "medical-officer") },
        { "training.test", ("password123", "training-coordinator") },
        { "safety.test", ("password123", "safety-officer") },
        { "equipment.test", ("password123", "equipment-manager") },
        { "manager.test", ("password123", "management") },
        { "employee.test", ("password123", "employee") }
    };

    public AuthenticationService(IConfiguration configuration)
    {
        _configuration = configuration;
        _jwtSecret = configuration["Jwt:Secret"] ?? "your-secret-key-change-this-in-production-at-least-32-characters-long";
        _jwtIssuer = configuration["Jwt:Issuer"] ?? "TavSecuritySystem";
        _jwtAudience = configuration["Jwt:Audience"] ?? "TavSecuritySystemUsers";
    }

    public LoginResponseDto Login(LoginRequestDto request)
    {
        var username = request.Username?.Trim();
        var password = request.Password;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            return new LoginResponseDto
            {
                Success = false,
                Message = "Username and password are required"
            };
        }

        if (!MockUsers.TryGetValue(username, out var userCredentials))
        {
            return new LoginResponseDto
            {
                Success = false,
                Message = "Invalid username or password"
            };
        }

        if (userCredentials.password != password)
        {
            return new LoginResponseDto
            {
                Success = false,
                Message = "Invalid username or password"
            };
        }

        var token = GenerateJwtToken(username, userCredentials.role);

        return new LoginResponseDto
        {
            Success = true,
            Message = "Login successful",
            Token = token,
            User = new UserInfoDto
            {
                Username = username,
                Role = userCredentials.role
            }
        };
    }

    public string GenerateJwtToken(string username, string role)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role),
            new Claim("username", username)
        };

        var token = new JwtSecurityToken(
            issuer: _jwtIssuer,
            audience: _jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
