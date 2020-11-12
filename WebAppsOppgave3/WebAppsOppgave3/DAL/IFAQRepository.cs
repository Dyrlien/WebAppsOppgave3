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
        Task<List<AnsweredCustomerQuestions>> GetEveryCustomerQuestion();
        Task<bool> RegisterNewQuestion(CustomerQuestions aQuestion);
        Task<List<CustomerQuestions>> GetUnansweredQuestions();
        Task<bool> RegAnsweredQuestion(AnsweredCustomerQuestions aQuestion);
        Task<bool> DeleteAnsweredQuestion(CustomerQuestions aQuestion);
    }
}
