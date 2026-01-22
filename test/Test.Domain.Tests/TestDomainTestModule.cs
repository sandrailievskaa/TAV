using Volo.Abp.Modularity;

namespace Test;

[DependsOn(
    typeof(TestDomainModule),
    typeof(TestTestBaseModule)
)]
public class TestDomainTestModule : AbpModule
{

}
