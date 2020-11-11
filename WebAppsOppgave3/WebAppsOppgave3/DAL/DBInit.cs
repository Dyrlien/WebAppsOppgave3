﻿using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppsOppgave3.Models;

namespace WebAppsOppgave3.DAL
{
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetService<NorwayContext>();

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            //Categories
            var ticket = new Categories
            {
                categoryName = "Billett"
            };
            var journey = new Categories
            {
                categoryName = "Reise"
            };
            var luggage = new Categories
            {
                categoryName = "Bagasje"
            };
            var corona = new Categories
            {
                categoryName = "Korona"
            };


            //Ticket category
            var ticketTypes = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Billettyper",
                answer = "Normal billett: 150kr per sone<br />Student: 10% rabatt <br />Honnør og barn under 12 år: 50% rabatt",
                category = ticket
            };
            var ticketLocation = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Hvor finner jeg billetten min?",
                answer = "Dersom du har bestilt en billett finnes den under Hent Billett, i navigasjonsmenyen øverst på siden",
                category = ticket
            };
            var cancelTicket = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Hvor kan jeg avbestille billetten min?",
                answer = "Det er for øyeblikket ikke mulig å avbestille billetten sin. Dersom du ikke har mulighet til å gjennomføre reisen,"
                        + "eller av andre grunner ønsker å avbestille, så må dette gjøres via vår telefon",
                category = ticket
            };
            context.QuestionsAndAnswer.Add(ticketTypes);
            context.QuestionsAndAnswer.Add(ticketLocation);
            context.QuestionsAndAnswer.Add(cancelTicket);
            context.SaveChanges();
            //Journey category
            var childrenAlone = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Barn som reiser alene",
                answer = "Dersom ditt barn skal reise alene ber, vi deg melde fra til sjåføren slik at barnet kan merkes med reiser alene kort."
                        + "I tillegg skal sjåføren informeres om stasjonen barnet skal av på samt fullt navn på personen som skal hente barnet.",
                category = journey
            };
            var animalsOnBus = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Er det tillatt med dyr på våre busser?",
                answer = "Bakerst i andre etasje er reservert seter for reisende med dyr. Hunder kan ligge ved bena til reisende, alle andre dyr må være i bur",
                category = journey
            };
            var handicapAccess = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Er bussene tilpasset handicappede passasjerer?",
                answer = "Alle våre busser er utstyr med rampe, slik at rullestolbrukere kommer seg inn i bussen."
                        + "I første etasje er det opptil 4 plasser, der setende kan fjernes og en spesialløsning for rullestoler kan settes inn",
                category = journey
            };
            var toiletOnBus = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Er det toaletter på våre busser?",
                answer = "Alle våre busser er utstyrt med ett toalett, bakerst i første etasje. det er ikke handicaptilgjengelig."
                        + "Dersom du er handicappet og ønsker å bruke toalettet ber vi om at du varsler sjåføren, slik at bussen kan vente på ditt toalettbesøk ved neste holdeplass",
                category = journey
            };
            context.QuestionsAndAnswer.Add(childrenAlone);
            context.QuestionsAndAnswer.Add(animalsOnBus);
            context.QuestionsAndAnswer.Add(handicapAccess);
            context.QuestionsAndAnswer.Add(toiletOnBus);
            context.SaveChanges();

            //Luggage Category
            var luggageStorage = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Bagasjelagring",
                answer = "Små kofferter og sekker kan oppbevares sammen med reisende, større kofferter og bagger oppbevares i bussen bagasjerom bakerst i bussen",
                category = luggage
            };
            var specialLuggage = new QuestionsAndAnswer
            {
                rating = 0,
                question = "SpesialBagasje",
                answer = "All spesialbagasje som må behandles varsomt(Instrumenter etc.) må oppbevares sammen med reisende."
                        + "Dersom bagasjen opptar mer enn ett sete medfører dette ekstrakostnad. Øvrig spesialbagasje(snowboard, barnevogn etc.) kan lagres i bussens bagasjerom",
                category = luggage
            };
            var lostLuggage = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Glemt bagasje",
                answer = "Bagasje som er lagt igjen på bussen ved endestasjon blir tatt med til hittegodskontoret for gjeldene stasjon."
                        + "Dersom glemt bagasje blir stjålet vil vi bistå med videoopptak fra sikkerhetskameraene, men vi tar ikke ansvar for stjålet bagasje.",
                category = luggage
            };
            context.QuestionsAndAnswer.Add(luggageStorage);
            context.QuestionsAndAnswer.Add(specialLuggage);
            context.QuestionsAndAnswer.Add(lostLuggage);
            context.SaveChanges();

            //Corona Category
            var coronaVirusMeasures = new QuestionsAndAnswer
            {
                rating = 0,
                question = "Koronatiltak hos NOR-WAY",
                answer = "Grunnet pandemien som for tiden plager landet, har vi i NOR-WAY en rekke tiltak for å sikre en trygg reise.<br />"
                         + "- Alle reisende er pålagt å ha på seg munnbind, med unntak barn under barneskolealder<br/>"
                         + "- All av- og påstigning foregår gjennom bussens bakre dører. Dette er for å skjerme sjåføren fra unødvendig smittefare<br/>"
                         + "- Selvskapet har begrenset antall billetter og seter som er tilgjengelig for reisen. Dette er tydelig markert på alle busser.<br/>"
                         + "- Passasjerer som ikke reiser sammen er ikke tillatt å sitte sammen",
                category = corona
            };
            context.QuestionsAndAnswer.Add(coronaVirusMeasures);
            context.SaveChanges();
        }

    }
}
