using CadastroDeNotasFiscais;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularPolicy",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

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

string angularDistPath = Path.Combine(
    Directory.GetParent(Directory.GetCurrentDirectory()).FullName,
    "CadastroDeNotasFiscais.Angular",
    "dist",
    "cadastro-de-notas-fiscais.angular"
);

if (Directory.Exists(angularDistPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(angularDistPath),
        RequestPath = "/angular"
    });


    // Configurar fallback para SPA Angular
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
                await context.Response.SendFileAsync(Path.Combine(angularDistPath, "index.html"));
            });
        }
    );
}
else
{
    Console.WriteLine($"AVISO: Pasta Angular dist não encontrada em: {angularDistPath}");
}

app.UseCors("AngularPolicy");

app.UseAuthorization();

app.MapControllers();



app.Run();
