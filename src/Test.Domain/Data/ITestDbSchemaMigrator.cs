using System.Threading.Tasks;

namespace Test.Data;

public interface ITestDbSchemaMigrator
{
    Task MigrateAsync();
}
