using System;
using Test.Assets;
using Volo.Abp.Application.Services;

namespace Test.Assets;

public interface IAssetAppService :
    ICrudAppService<AssetDto, Guid, GetAssetListDto, CreateUpdateAssetDto>
{
}



