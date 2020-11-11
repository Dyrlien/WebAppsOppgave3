using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppsOppgave3.Models;

namespace WebAppsOppgave3.DAL
{
    public interface IFAQRepository
    {
        Task<List<Categories>> GetEveryCategory();
        Task<List<QuestionsAndAnswer>> GetEveryQuestion();
    }
}
