# WebAppsOppgave3 s333738 Christian Dyrli

Jeg startet først i angular, men innså at hvis løsning skulle holde en viss standard innen fristen, måtte jeg gå over til JS/Jquery

-FAQ tabben inneholder både selvskapets standard FAQ, besvarte kundespørsmål, likes og dislikes, og muliget for å sende inn nye spørsmål.
sistnevnte er inputvalidert. Spørsmål som registeres listes ut i "Ubesvarte spørsmål"

-"Ubesvarte spørsmål" tabben inneholder kundespørsmål som ikke er besvart av en ansatt enda. Denne er tenkt å visualisere
en mulig løsning for administratorer. Registrerte svar listes ut på FAQ siden. Slettede svar slettes fra databasen, i fall tullemeldinger, eller spørsmål irrelevant for selvskapet skulle være registrert.

-Når "like-funksjonen" brukes, disables begge knappene for å illustrere at én person ikke skal kunne like et svar 100 ganger.
For enkelhets skyld reverteres disse hvis du relaster siden eller bytter spørsmål.
Det oppdaterte tallet lagres i databasen og reverteres ikke.

__________________________________________________________________
Kilder

-fontawesome.com  -tommel opp og tommel ned ikoner er hentet herfra.

-Noe css, html og js er hentet fra forrige oppgave.