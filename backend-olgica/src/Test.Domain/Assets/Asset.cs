using System;
using Test.Shared;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.Assets;

public class Asset : AuditedAggregateRoot<Guid>
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

    protected Asset()
    {
    }

    public Asset(
        Guid id,
        string assetId,
        string name,
        string type) : base(id)
    {
        AssetId = assetId;
        Name = name;
        Type = type;
        Status = AssetStatus.Active;
    }
}

