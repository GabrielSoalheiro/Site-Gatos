using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repositorys;
using Microsoft.AspNetCore.Http;
using cats.Repository.Cats;
using cats.Repository.Frases;

namespace Repositorys
{
    public static class Services
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ICatsService, CatsRepository>();
            services.AddScoped<IFrasesService,FrasesRepository>(); 
        }
    }
}
