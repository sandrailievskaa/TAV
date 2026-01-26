using Xunit;

namespace Test.EntityFrameworkCore;

[CollectionDefinition(TestTestConsts.CollectionDefinitionName)]
public class TestEntityFrameworkCoreCollection : ICollectionFixture<TestEntityFrameworkCoreFixture>
{

}
