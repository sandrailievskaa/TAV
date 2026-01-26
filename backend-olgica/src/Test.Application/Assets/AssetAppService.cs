using System;
using System.Linq;
using System.Threading.Tasks;
using Test.Assets;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.Assets;

public class AssetAppService :
    CrudAppService<
        Asset,
        AssetDto,
        Guid,
        GetAssetListDto,
        CreateUpdateAssetDto>,
    IAssetAppService
{
    public AssetAppService(IRepository<Asset, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<Asset>> CreateFilteredQueryAsync(GetAssetListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x =>
                x.AssetId.Contains(input.Filter) ||
                x.Name.Contains(input.Filter) ||
                (x.Description != null && x.Description.Contains(input.Filter)));
        }

        if (!string.IsNullOrWhiteSpace(input.Type))
        {
            query = query.Where(x => x.Type == input.Type);
        }

        if (input.Status.HasValue)
        {
            query = query.Where(x => x.Status == input.Status.Value);
        }

        return query;
    }
}

