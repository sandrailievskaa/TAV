using Test.Samples;
using Xunit;

namespace Test.EntityFrameworkCore.Domains;

[Collection(TestTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<TestEntityFrameworkCoreTestModule>
{

}
