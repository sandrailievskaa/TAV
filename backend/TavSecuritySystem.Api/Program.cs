using TavSecuritySystem.Api.Data;
using TavSecuritySystem.Api.Models;
using TavSecuritySystem.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);

// Add services
// Eксплицитно оневозможи authorization за POC
builder.Services.AddControllers(options =>
{
    // Allow anonymous access by default for POC
    options.Filters.Clear();
});

// Експлицитно не додавај authorization services
// builder.Services.AddAuthorization(); // НЕ СЕ КОРИСТИ
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "TAV Security System API",
        Version = "v1",
        Description = "API за TAV Security System"
    });
    
    // Ensure Swagger JSON is accessible
    c.CustomSchemaIds(type => type.FullName);
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        // За POC - дозволи сите origins во development
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

// In-Memory Database (за POC)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TavSecurityDb"));

// Services
builder.Services.AddScoped<IExampleEntityService, ExampleEntityService>();

var app = builder.Build();

// Configure pipeline - правилен редослед
app.UseRouting();

// CORS мора да биде после UseRouting
app.UseCors("AllowFrontend");

// Swagger available in all environments for POC
app.UseSwagger(c =>
{
    c.RouteTemplate = "swagger/{documentName}/swagger.json";
});
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TAV Security System API V1");
    c.RoutePrefix = "swagger";
});

// Only use HTTPS redirection if HTTPS is configured
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Authorization - НЕ СЕ КОРИСТИ за POC
// app.UseAuthorization();

// Health check endpoints
app.MapGet("/", () => 
    Results.Json(new { message = "TAV Security System API is running", version = "v1" }))
    .AllowAnonymous();

app.MapGet("/health", () => 
    Results.Json(new { status = "healthy" }))
    .AllowAnonymous();

app.MapControllers();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    SeedData.Initialize(dbContext);
}

app.Run();
