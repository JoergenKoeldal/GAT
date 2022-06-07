using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using GatApi.Data;
using GatApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<GatApiContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("GatApiContext") ?? throw new InvalidOperationException("Connection string 'GatApiContext' not found.")));

// Add services to the container.
builder.Services.AddScoped<PdfService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
