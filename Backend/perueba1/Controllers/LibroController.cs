using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using perueba1.Entidades;

namespace perueba1.Controllers
{
    [ApiController]
    [Route("api/libros")] //Endpoint
    public class LibroController : ControllerBase
    {
        private readonly string? _connectionString;
        public LibroController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Libro>>> GetConsultaLibros()
        {
            var libros = new List<Libro>();
            try
            {
                using (SqlConnection oConn = new SqlConnection(_connectionString))
                {
                    await oConn.OpenAsync();

                    using (SqlCommand oCmd = new SqlCommand("SELECT Id, Titulo, AutorId,Imagen From Libros", oConn))
                    {
                        oCmd.CommandType = System.Data.CommandType.Text;

                        using (SqlDataReader reader = await oCmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                libros.Add(new Libro
                                {
                                    Id = (int)reader["Id"],
                                    Titulo = reader["Titulo"].ToString(),
                                    AutorId = (int)reader["AutorId"],
                                    Imagen = reader["Imagen"] != DBNull.Value ? reader["Imagen"].ToString() : "default.jpg"
                                });
                            }
                        }
                    }
                }
                return Ok(libros);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
    }
    }
}
