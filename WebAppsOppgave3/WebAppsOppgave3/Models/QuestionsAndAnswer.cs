using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppsOppgave3.Models
{
    public class QuestionsAndAnswer
    {
        public int id { get; set; }
        public int upvote { get; set; }
        public int downvote { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
        public virtual Categories category { get; set; }
    }
}
