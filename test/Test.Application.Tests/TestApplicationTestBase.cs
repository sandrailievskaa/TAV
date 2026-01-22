using Volo.Abp.Modularity;

namespace Test;

public abstract class TestApplicationTestBase<TStartupModule> : TestTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
