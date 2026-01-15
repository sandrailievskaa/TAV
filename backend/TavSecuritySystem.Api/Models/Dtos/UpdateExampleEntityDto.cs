using System.ComponentModel.DataAnnotations;

namespace TavSecuritySystem.Api.Models.Dtos;

public class UpdateExampleEntityDto
{
    [StringLength(200)]
    public string? Name { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }
}
