using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppsOppgave3.Models
{
    public class AnsweredCustomerQuestions
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string email { get; set; }
        public string customerQuestion { get; set; }
        public string customerAnswer { get; set; }
        virtual public Categories category { get; set; }
    }
}
