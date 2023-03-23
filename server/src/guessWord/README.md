# ALGORITM för WORDLE : Guess Word

1. Skapa en funktion `GUESS_WORD` som tar in två strängar: en gissning, ett korrekt ord.

2. Skapa en tom array för att spara resultatet, `RESULT`.

3. Konvertera båda strängarna till lowercase.

4. Kontrollera de båda strängarna enligt följande kriterier: De ska ha samma längd. De ska inte innehålla mellanslag eller specialtecken.  
	4.1. Om de har olika längd, returnera **"error": "The word length does not match."**.   
  4.2. Om de innehåller mellanslag eller specialtecken, returnera **"error": "Incorrect input."** Använd regex så du ser cool ut.

5. Skapa en lista för att hålla koll på felaktiga gissningar, `WRONG_GUSSES`.

6. Skapa ett objekt för att hålla koll på vilka bokstäver som finns i det korrekta ordet som inte använts hittills i gissningen, `CORRECT_LETTERS`.

7. Loopa igenom bokstäverna i gissningsordet. 
  7.1. Lägg till bokstaven i `RESULT` med inledande **"result": "incorrect"**.  
  7.2. Lägg till bokstaven på samma index från det korrekta ordet i `CORRECT_LETTERS`. Finns bokstaven redan i objektet, lägg till +1 i antal.  
  7.3. Kolla om bokstaven i gissningen är rätt bokstav på motsvarande plats i det korrekta ordet.  
    - 7.3.1. Om ja, ändra till **"result": "correct"** i `RESULT`. Ta bort -1 från antalet på bokstaven i `CORRECT_LETTERS`.      
    - 7.3.2. Om nej, lägg till indexpositionen för bokstaven i `WRONG_GUSSES`.    

8. Loopa igenom listan med felaktiga gissningar. För varje bokstav, kontrollera om den inte finns eller är på fel plats. Jämför nu med `CORRECT_LETTERS`.  
  8.1. För bokstäver som finns i `CORRECT_LETTERS`, lägg till i resultat-arrayen ett objekt med **"result": "misplaced"**. Minska antalet på motsvarande bokstav i `CORRECT_LETTERS`.  

9. Returnera listan med resultat.