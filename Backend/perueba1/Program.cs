var builder = WebApplication.CreateBuilder(args);

// 1. Agregar Política de CORS
builder.Services.AddCors(options => {
    options.AddPolicy("PermitirTodo", policy => {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddControllers();
var app = builder.Build();

// 2. Habilitar CORS
app.UseCors("PermitirTodo");

app.MapControllers();
app.Run();