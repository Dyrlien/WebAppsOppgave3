using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppsOppgave3.Models
{
    public class CustomerQuestions
    {
        public int id { get; set; }
        public string email { get; set; }
        public string customerquestion { get; set; }
        virtual public Categories category { get; set; }
    }
}
