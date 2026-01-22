using Test.Samples;
using Xunit;

namespace Test.EntityFrameworkCore.Applications;

[Collection(TestTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<TestEntityFrameworkCoreTestModule>
{

}
