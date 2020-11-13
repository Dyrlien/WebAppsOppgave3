using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
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
        public async Task<List<AnsweredCustomerQuestions>> GetEveryCustomerQuestion()
        {
            return await _NorwayDB.AnsweredCustomerQuestions.ToListAsync();
        }
        public async Task<bool> RegisterNewQuestion(CustomerQuestions aQuestion)
        {
            try 
            { 
                _NorwayDB.CustomerQuestions.Add(aQuestion);
                await _NorwayDB.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<List<CustomerQuestions>> GetUnansweredQuestions()
        {
            return await _NorwayDB.CustomerQuestions.ToListAsync();
        }
        public async Task<bool> RegAnsweredQuestion(AnsweredCustomerQuestions aQuestion)
        {            
            Categories category = await _NorwayDB.Categories.Where(element => element.categoryName == aQuestion.category.categoryName).FirstOrDefaultAsync();
            try
            {
                aQuestion.category = category;
                _NorwayDB.AnsweredCustomerQuestions.Add(aQuestion);
                await _NorwayDB.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> DeleteAnsweredQuestion(CustomerQuestions aQuestion)
        {
            CustomerQuestions question = await _NorwayDB.CustomerQuestions.Where(element => element.id == aQuestion.id).FirstOrDefaultAsync();
            try
            {
                _NorwayDB.CustomerQuestions.Remove(question);
                await _NorwayDB.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> UpdateVotes(QuestionsAndAnswer aQuestion)
        {
            QuestionsAndAnswer aQnA = await _NorwayDB.QuestionsAndAnswer.Where(element => element.id == aQuestion.id).FirstOrDefaultAsync();
            try
            {
                aQnA.upvote = aQuestion.upvote;
                aQnA.downvote = aQuestion.downvote;
                await _NorwayDB.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
