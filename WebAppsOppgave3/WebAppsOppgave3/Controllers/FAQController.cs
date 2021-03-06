﻿using System;
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
        
        public async Task<List<Categories>> GetEveryCategories()
        {
            return await _iFAQRep.GetEveryCategory();            
        }
        public async Task<List<QuestionsAndAnswer>> GetEveryQuestion()
        {
            return await _iFAQRep.GetEveryQuestion();
        }
        public async Task<List<AnsweredCustomerQuestions>> GetEveryCustomerQuestion()
        {
            return await _iFAQRep.GetEveryCustomerQuestion();
        }
        public async Task<bool> RegisterNewQuestion(CustomerQuestions aQuestion)
        {
            return await _iFAQRep.RegisterNewQuestion(aQuestion);
        }
        public async Task<List<CustomerQuestions>> GetUnansweredQuestions()
        {
            return await _iFAQRep.GetUnansweredQuestions();
        }
        public async Task<bool> RegAnsweredQuestion(AnsweredCustomerQuestions aQuestion)
        {
            return await _iFAQRep.RegAnsweredQuestion(aQuestion);
        }
        public async Task<bool> DeleteAnsweredQuestion(CustomerQuestions aQuestion)
        {
            return await _iFAQRep.DeleteAnsweredQuestion(aQuestion);
        }
        public async Task<bool> UpdateVotes(QuestionsAndAnswer aQuestion)
        {
            return await _iFAQRep.UpdateVotes(aQuestion);
        }
    }
}
