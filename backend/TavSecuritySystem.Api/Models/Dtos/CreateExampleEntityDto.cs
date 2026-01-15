using System.ComponentModel.DataAnnotations;

namespace TavSecuritySystem.Api.Models.Dtos;

public class CreateExampleEntityDto
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }
}
