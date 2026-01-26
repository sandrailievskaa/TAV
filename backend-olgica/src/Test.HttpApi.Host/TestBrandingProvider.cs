using Microsoft.Extensions.Localization;
using Test.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Test;

[Dependency(ReplaceServices = true)]
public class TestBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<TestResource> _localizer;

    public TestBrandingProvider(IStringLocalizer<TestResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
