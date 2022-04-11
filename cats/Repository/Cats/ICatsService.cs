using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace cats.Repository.Cats
{
    public interface ICatsService
    {
         Task<IMG_API_Results[]> GetItem();
    }
}