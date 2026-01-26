using System;
using System.ComponentModel.DataAnnotations;
using Test.Shared;
using Volo.Abp.Application.Dtos;

namespace Test.Assets;

public class AssetDto : AuditedEntityDto<Guid>
{
    public string AssetId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public string? Description { get; set; }
    public string? Location { get; set; }
    public AssetStatus Status { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public decimal? PurchaseCost { get; set; }
    public string? SerialNumber { get; set; }
    public string? Manufacturer { get; set; }
    public DateTime? LastMaintenanceDate { get; set; }
    public DateTime? NextMaintenanceDate { get; set; }
}

public class CreateUpdateAssetDto
{
    [Required]
    [StringLength(50)]
    public string AssetId { get; set; } = null!;

    [Required]
    [StringLength(200)]
    public string Name { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string Type { get; set; } = null!;

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(200)]
    public string? Location { get; set; }

    public AssetStatus Status { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public decimal? PurchaseCost { get; set; }

    [StringLength(100)]
    public string? SerialNumber { get; set; }

    [StringLength(200)]
    public string? Manufacturer { get; set; }

    public DateTime? LastMaintenanceDate { get; set; }
    public DateTime? NextMaintenanceDate { get; set; }
}

public class GetAssetListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public string? Type { get; set; }
    public AssetStatus? Status { get; set; }
}

