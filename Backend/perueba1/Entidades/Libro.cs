namespace perueba1.Entidades
{
    public class Libro
    {
        public int Id { get; set; }
        public required string Titulo { get; set; }
        public int AutorId  { get; set; }
    }
}
