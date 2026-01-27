namespace TavSecuritySystem.Api.Models.Dtos;

public class LoginResponseDto
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? Token { get; set; }
    public UserInfoDto? User { get; set; }
}

public class UserInfoDto
{
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
