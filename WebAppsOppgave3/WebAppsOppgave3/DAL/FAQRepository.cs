using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppsOppgave3.Models;

namespace WebAppsOppgave3.DAL
{
    public class FAQRepository : IFAQRepository
    {
        public readonly NorwayContext _NorwayDB;

        public FAQRepository(NorwayContext db)
        {
            _NorwayDB = db;
        }

        public async Task<List<Categories>> GetEveryCategory()
        {
            return await _NorwayDB.Categories.ToListAsync();
        }
        public async Task<List<QuestionsAndAnswer>> GetEveryQuestion()
        {
            return await _NorwayDB.QuestionsAndAnswer.ToListAsync();
        }
    }
}
