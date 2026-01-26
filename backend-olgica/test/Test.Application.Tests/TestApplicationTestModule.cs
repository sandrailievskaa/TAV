using Volo.Abp.Modularity;

namespace Test;

[DependsOn(
    typeof(TestApplicationModule),
    typeof(TestDomainTestModule)
)]
public class TestApplicationTestModule : AbpModule
{

}
