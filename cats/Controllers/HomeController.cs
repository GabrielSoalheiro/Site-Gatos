using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using cats.Models;
using Models;
using cats.Repository.Cats;
using cats.Repository.Frases;


namespace cats.Controllers;

public class HomeController : Controller
{

    private readonly ILogger<HomeController> _logger;
    readonly ICatsService _catService;
    readonly IFrasesService _fraseService;


    public HomeController(ILogger<HomeController> logger, IFrasesService frase, ICatsService IMG )
    {
        _fraseService = frase;
        _catService = IMG;
        _logger = logger;

    }

    public async Task<IActionResult> Index()
    {
       ViewBag.o =  await _catService.GetItem();
       ViewBag.t = await   _fraseService.GetItem();

        return View();
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
