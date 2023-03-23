# ALGORITM för WORDLE : Word Choice

1. Skapa en funktion som tar in följande: en lista med ord, en siffra för ordlängd, true/false för att indikera unika bokstäver.

2. Filtrera listan:  
  2.1. Kontrollera orden så att de inte innehåller specialtecken, mellanslag eller är tomma strängar
  2.2. Behåll bara ord med samma längd som siffran    
  2.3. Om true, ta bort ord med dubbla bokstäver  

3. Kontrollera längden på listan.   
  3.1. Om längden == 0, returnera `"error, no matching words found"`  
  3.2. Om längden 1, returnera det enda ordet.  
  3.3. Om längden större än 1, använd längden på listan med Math.random för att returnera ett slumpmässigt ord ur listan på de filtrerade orden.   