using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.BlobStoring.Database.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Test.Employees;
using Test.MedicalExaminations;
using Test.Trainings;
using Test.Incidents;
using Test.PPE;
using Test.Documents;
using Test.Assets;
using Test.Positions;
using Test.Organizations;
using Test.ExampleEntities;

namespace Test.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class TestDbContext :
    AbpDbContext<TestDbContext>,
    ITenantManagementDbContext,
    IIdentityDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */


    #region Entities from the modules

    /* Notice: We only implemented IIdentityProDbContext and ISaasDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityProDbContext and ISaasDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    // Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
    public DbSet<IdentitySession> Sessions { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }
    public DbSet<Test> Tests { get; set; }
    public DbSet<Employees.Employee> Employees { get; set; }
    public DbSet<MedicalExaminations.MedicalExamination> MedicalExaminations { get; set; }
    public DbSet<Trainings.Training> Trainings { get; set; }
    public DbSet<Incidents.Incident> Incidents { get; set; }
    public DbSet<Incidents.CorrectiveAction> CorrectiveActions { get; set; }
    public DbSet<Incidents.IncidentAttachment> IncidentAttachments { get; set; }
    public DbSet<PPE.EmployeePPE> EmployeePPEs { get; set; }
    public DbSet<Documents.EmployeeDocument> EmployeeDocuments { get; set; }
    public DbSet<Assets.Asset> Assets { get; set; }
    public DbSet<Positions.Position> Positions { get; set; }
    public DbSet<Organizations.Organization> Organizations { get; set; }
    public DbSet<ExampleEntities.ExampleEntity> ExampleEntities { get; set; }


    #endregion

    public TestDbContext(DbContextOptions<TestDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureFeatureManagement();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureTenantManagement();
        builder.ConfigureBlobStoring();

        builder.Entity<Test>(b =>
        {
            b.ToTable("Tests");
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(128);
        });

        // Employee
        builder.Entity<Employee>(b =>
        {
            b.ToTable("Employees");
            b.ConfigureByConvention();
            b.Property(x => x.EmployeeId).IsRequired().HasMaxLength(50);
            b.Property(x => x.FirstName).IsRequired().HasMaxLength(100);
            b.Property(x => x.LastName).IsRequired().HasMaxLength(100);
            b.Property(x => x.Email).IsRequired().HasMaxLength(200);
            b.Property(x => x.Phone).IsRequired().HasMaxLength(50);
            b.Property(x => x.Address).IsRequired().HasMaxLength(500);
            b.HasIndex(x => x.EmployeeId).IsUnique();
        });

        // MedicalExamination
        builder.Entity<MedicalExamination>(b =>
        {
            b.ToTable("MedicalExaminations");
            b.ConfigureByConvention();
            b.Property(x => x.ExamId).IsRequired().HasMaxLength(50);
            b.Property(x => x.Doctor).IsRequired().HasMaxLength(200);
            b.HasOne(x => x.Employee).WithMany(x => x.MedicalExaminations).HasForeignKey(x => x.EmployeeId);
            b.HasIndex(x => x.ExamId).IsUnique();
        });

        // Training
        builder.Entity<Training>(b =>
        {
            b.ToTable("Trainings");
            b.ConfigureByConvention();
            b.Property(x => x.TrainingId).IsRequired().HasMaxLength(50);
            b.Property(x => x.TrainingName).IsRequired().HasMaxLength(200);
            b.Property(x => x.Instructor).IsRequired().HasMaxLength(200);
            b.HasOne(x => x.Employee).WithMany(x => x.Trainings).HasForeignKey(x => x.EmployeeId);
            b.HasIndex(x => x.TrainingId).IsUnique();
        });

        // Incident
        builder.Entity<Incident>(b =>
        {
            b.ToTable("Incidents");
            b.ConfigureByConvention();
            b.Property(x => x.IncidentId).IsRequired().HasMaxLength(50);
            b.Property(x => x.Time).IsRequired().HasMaxLength(10);
            b.Property(x => x.Location).IsRequired().HasMaxLength(200);
            b.Property(x => x.Description).IsRequired().HasMaxLength(2000);
            b.Property(x => x.RootCause).IsRequired().HasMaxLength(1000);
            b.HasOne(x => x.Employee).WithMany().HasForeignKey(x => x.EmployeeId);
            b.HasMany(x => x.CorrectiveActions).WithOne(x => x.Incident).HasForeignKey(x => x.IncidentId);
            b.HasMany(x => x.Attachments).WithOne(x => x.Incident).HasForeignKey(x => x.IncidentId);
            b.HasIndex(x => x.IncidentId).IsUnique();
        });

        builder.Entity<CorrectiveAction>(b =>
        {
            b.ToTable("CorrectiveActions");
            b.ConfigureByConvention();
            b.Property(x => x.Action).IsRequired().HasMaxLength(1000);
            b.Property(x => x.Responsible).IsRequired().HasMaxLength(200);
        });

        builder.Entity<IncidentAttachment>(b =>
        {
            b.ToTable("IncidentAttachments");
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(200);
            b.Property(x => x.Type).IsRequired().HasMaxLength(50);
            b.Property(x => x.FileSize).IsRequired().HasMaxLength(50);
            b.Property(x => x.UploadedBy).IsRequired().HasMaxLength(200);
        });

        // EmployeePPE
        builder.Entity<EmployeePPE>(b =>
        {
            b.ToTable("EmployeePPEs");
            b.ConfigureByConvention();
            b.Property(x => x.PPEItem).IsRequired().HasMaxLength(200);
            b.Property(x => x.Type).IsRequired().HasMaxLength(100);
            b.HasOne(x => x.Employee).WithMany(x => x.AssignedPPE).HasForeignKey(x => x.EmployeeId);
        });

        // EmployeeDocument
        builder.Entity<EmployeeDocument>(b =>
        {
            b.ToTable("EmployeeDocuments");
            b.ConfigureByConvention();
            b.Property(x => x.DocumentName).IsRequired().HasMaxLength(200);
            b.Property(x => x.FileSize).IsRequired().HasMaxLength(50);
            b.HasOne(x => x.Employee).WithMany(x => x.Documents).HasForeignKey(x => x.EmployeeId);
        });

        // Asset
        builder.Entity<Asset>(b =>
        {
            b.ToTable("Assets");
            b.ConfigureByConvention();
            b.Property(x => x.AssetId).IsRequired().HasMaxLength(50);
            b.Property(x => x.Name).IsRequired().HasMaxLength(200);
            b.Property(x => x.Type).IsRequired().HasMaxLength(100);
            b.HasIndex(x => x.AssetId).IsUnique();
        });

        // Position
        builder.Entity<Position>(b =>
        {
            b.ToTable("Positions");
            b.ConfigureByConvention();
            b.Property(x => x.PositionName).IsRequired().HasMaxLength(200);
            b.Property(x => x.Department).IsRequired().HasMaxLength(100);
        });

        // Organization
        builder.Entity<Organization>(b =>
        {
            b.ToTable("Organizations");
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(200);
        });

        // ExampleEntity
        builder.Entity<ExampleEntity>(b =>
        {
            b.ToTable("ExampleEntities");
            b.ConfigureByConvention();
            b.Property(x => x.Name).IsRequired().HasMaxLength(200);
            b.Property(x => x.Description).HasMaxLength(1000);
        });


        /* Configure your own tables/entities inside here */

        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(TestConsts.DbTablePrefix + "YourEntities", TestConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});
    }
}
