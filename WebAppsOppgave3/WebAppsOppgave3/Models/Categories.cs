using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAppsOppgave3.Models
{
    public class Categories
    {               
        public int id { get; set; }
        public string categoryName { get; set; }
    }
}
