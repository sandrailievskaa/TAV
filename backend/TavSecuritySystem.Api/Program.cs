using TavSecuritySystem.Api.Data;
using TavSecuritySystem.Api.Models;
using TavSecuritySystem.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.Filters.Clear();
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "TAV Security System API",
        Version = "v1",
        Description = "API за TAV Security System"
    });
    
    c.CustomSchemaIds(type => type.FullName);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            policy.SetIsOriginAllowed(_ => true)
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        }
        else
        {
            policy.WithOrigins("http://localhost:8080", "http://localhost:5173")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        }
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TavSecurityDb"));
builder.Services.AddScoped<IExampleEntityService, ExampleEntityService>();

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowFrontend");

app.UseSwagger(c =>
{
    c.RouteTemplate = "swagger/{documentName}/swagger.json";
});
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TAV Security System API V1");
    c.RoutePrefix = "swagger";
});

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.MapGet("/", () => 
    Results.Json(new { message = "TAV Security System API is running", version = "v1" }))
    .AllowAnonymous();

app.MapGet("/health", () => 
    Results.Json(new { status = "healthy" }))
    .AllowAnonymous();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    SeedData.Initialize(dbContext);
}

app.Run();
