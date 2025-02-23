using CadastroDeNotasFiscais;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

ModuloDeInjecaoDeDependencia.AdicionarServicos(builder.Services, builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")
),

    ContentTypeProvider = new FileExtensionContentTypeProvider
    {
        Mappings = { [".properties"] = "application/x-msdownload" }
    }
});

app.UseAuthorization();

app.MapControllers();

app.Run();
