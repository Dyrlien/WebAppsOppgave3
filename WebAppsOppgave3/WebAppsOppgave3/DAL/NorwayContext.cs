using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppsOppgave3.Models;

namespace WebAppsOppgave3.DAL
{
    public class NorwayContext : DbContext
    {
        public NorwayContext(DbContextOptions<NorwayContext> options ) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<QuestionsAndAnswer> QuestionsAndAnswer { get; set; }
        public DbSet<CustomerQuestions> CustomerQuestions { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
