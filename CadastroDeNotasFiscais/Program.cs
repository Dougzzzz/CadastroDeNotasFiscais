using CadastroDeNotasFiscais;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularPolicy",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add services from your dependency injection module
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

// Configure default static files (wwwroot folder)
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

// Angular dist path configuration
string angularDistPath = Path.Combine(
    Directory.GetParent(Directory.GetCurrentDirectory()).FullName,
    "CadastroDeNotasFiscais.Angular",
    "dist",
    "cadastro-de-notas-fiscais.angular",
    "browser"
);

if (Directory.Exists(angularDistPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(angularDistPath),
        RequestPath = "/angular"
    });

    // Handle Angular app routing (SPA fallback)
    app.MapWhen(
        context => context.Request.Path.StartsWithSegments("/angular"),
        appBuilder =>
        {
            appBuilder.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(angularDistPath),
                RequestPath = ""
            });

            appBuilder.Run(async context =>
            {
                context.Response.ContentType = "text/html";
                string indexPath = Path.Combine(angularDistPath, "index.html");
                Console.WriteLine($"Servindo SPA fallback para: {context.Request.Path} -> {indexPath}");
                await context.Response.SendFileAsync(indexPath);
            });
        }
    );
}
else
{
    Console.WriteLine($"AVISO: Pasta Angular dist não encontrada em: {angularDistPath}");
    // List parent directory contents to help diagnose
    string parentDir = Directory.GetParent(Directory.GetCurrentDirectory()).FullName;
    Console.WriteLine($"Conteúdo do diretório pai: {string.Join(", ", Directory.GetDirectories(parentDir).Select(Path.GetFileName))}");
}

// Enable CORS
app.UseCors("AngularPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();