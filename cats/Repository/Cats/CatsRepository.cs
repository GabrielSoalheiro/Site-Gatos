using Models;
using Newtonsoft.Json;

namespace cats.Repository.Cats
{
    public  class CatsRepository : ICatsService
    {
        static HttpClient _Cats = new HttpClient { BaseAddress = new Uri(@"https://api.thecatapi.com/v1/images/search/") };
        
        public async Task<IMG_API_Results[]> GetItem()
        {
            var content = await _Cats.GetAsync($"");
            var contentResult = await content.Content.ReadAsStringAsync();
            var results = JsonConvert.DeserializeObject<IMG_API_Results[]>(contentResult);

            return results;
        }
    }
}