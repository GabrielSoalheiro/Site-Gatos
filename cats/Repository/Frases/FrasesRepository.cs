using Models;
using Newtonsoft.Json;

namespace cats.Repository.Frases
{
    public class FrasesRepository : IFrasesService
    {
        static HttpClient _frases = new HttpClient { BaseAddress = new Uri(@"https://www.boredapi.com/api/activity") };
        
        public async Task<Frases_API_Results> GetItem()
        {
            var content = await _frases.GetAsync($"");
            var contentResult = await content.Content.ReadAsStringAsync();
             var results = JsonConvert.DeserializeObject<Frases_API_Results>(contentResult);

            return results;
        }

    }
}