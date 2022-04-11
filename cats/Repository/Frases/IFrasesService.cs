using Models;

namespace cats.Repository.Frases
{
    public interface IFrasesService
    {
         Task<Frases_API_Results> GetItem();
    }
}