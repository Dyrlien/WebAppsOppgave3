using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAppsOppgave3.DAL;
using WebAppsOppgave3.Models;

namespace WebAppsOppgave3.Controller
{
    [Route("[controller]/[action]")]
    public class FAQController : ControllerBase
    {
        private readonly IFAQRepository _iFAQRep;

        public FAQController(IFAQRepository iFAQRep)
        {
            _iFAQRep = iFAQRep;
        }

        [HttpGet]
        public async Task<List<Categories>> GetEveryCategories()
        {
            return await _iFAQRep.GetEveryCategory();            
        }
        public async Task<List<QuestionsAndAnswer>> GetEveryQuestion()
        {
            return await _iFAQRep.GetEveryQuestion();
        }

    }
}
