# react-platsbanken-starter

## Installation

1. Klona ner repo:
```bash
git clone https://github.com/javascriptst18/react-platsbanken-starter
```
2. cd in i mappen som skapas
```bash
cd react-platsbanken-starter
```
3. Installera alla dependencies
```bash
npm install # yarn
```
4. Kör igång utvecklingsservern
```bash
npm start # yarn start
```

**Om du vill använda ESLint så finns det redan en konfiguration för det. Om du vill att denna lintinghjälp ska dyka upp i din editor så måste du installera ESLint som ett tillägg till din editor**

## Egenskaper

### Egenskap: _Listning av jobbannonser_

> Den mest grundläggande funktionen för en jobbannons-app
är att kunna lista jobbannonser. Listan behöver innehålla följande: _annonsrubrik_, _arbetsplats_, _kommun_, _sista ansökningsdag_, _yrkesbenämning_, _anställningstyp_ samt länk till platsbanken.

---

**Scenario**: Lista 10 senaste lediga jobben i Stockholms län

**Givet**:  att en arbetssökande besöker startsidan

**Så**: visas en lista med de 10 senaste jobbannonserna i Stockholms län

---

**Scenario**: Visa totalt antal lediga jobb i Stockholms län

**Givet**: att en arbetssökande besöker startsidan

**Så**: visas total antal lediga jobb i Stockholms län

---


### **Egenskap**: _Anpassad listning_
  
> För att göra appen mer användbar behöver användaren kunna anpassa listningen efter behov. 

---

**Scenariomall**: Möjlighet att välja antal annonser i en listning

**Givet**: att en arbetssökande besöker startsidan

**Och** väljer `<val>` i en meny

**Så**: uppdateras listan med `<antal>` annonser

```
Exempel:
| val | antal |
| 10  | 10 st |
| 20  | 20 st |
| 30  | 30 st |
```

---

**Scenariomall**: Möjlighet att välja län 

**Givet**: att en arbetssökande besöker startsidan

**Och**: väljer `<val>` i en meny

**Så**: uppdateras listan med annonser från `<län>`

```
Exempel:
|    val    |      län       |
| Stockholm | Stockholms län |
|  Uppsala  |  Uppsala län   |
|   Skåne   |   Skåne län    |
```

---

### **Egenskap**: _Sökning_
> Allmänna listningar är användbara men för att kunna hitta rätt jobb behövs fritextsökning.

---

**Scenario**: Söka annonser efter yrke

**Givet**: att en arbetssökande besöker startsidan

**När**: den arbetssökande matar in ett eller flera nyckelord i ett sökfält

**Och**: trycker på knappen för sök

**Så**: visas en träfflista för den aktuella sökningen

### **Egenskap**: _Kategorilistning_
> Om man inte vet vad man letar efter kan kategorilistning ge inspiration till möjliga annonser att söka. Kategorierna utgörs av de yrkesområden som Arbetsförmedlingen definierat.

---

**Scenario**: Lista yrkesområden

**Givet**: att en arbetssökande besöker startsidan

**Så**: visas en lista länkad lista med yrkesområden

---

**Scenario**: Lista annonser efter yrkesområde

**Givet**: att en arbetssökande besöker startsidan

**När**: den arbetssökande klickar på ett yrkesområde

**Så**: visas en träfflista för det valda yrkesområdet


### **Egenskap**: _Bläddring av listningar_

>De top 10 (20, 30) träffarna kanske inte är tillräckliga utan för att appen ska vara användbar för alla användare behöver vi lägga till möjlighet att bläddra mellan sidor i träfflistan.

---

**Scenario**: Nästa sida i listningen

**Givet**: att en arbetssökande besöker startsidan

**När**: den arbetssökande klickar på knappen för nästa sida

**Så** visas den nästa sidan i träfflistan

---

**Scenario**: Föregående sida i listningen

**Givet**: att en arbetssökande besöker startsidan

**Och**: har navigerat till nästa sida i träfflistan

**När**: den arbetssökande klickar på knappen för föregående sida

**Så**: visas den föregående sidan i träfflistan

---

### **Egenskap**: _Annonsdetaljer_

> För att hålla kvar besökaren på vår sida behöver vi implementera en sida för att visa annonser. Vi ska alltså ersätta urlen till platsbanken i listningen med en länk till vår egen sida.
---

**Scenario**: Visa annons

**Givet**: att en arbetssökande besöker startsidan

**När**: den arbetssökande klickar på en länk till en jobbannons

**Så**: visas detaljerna för den valda jobbannonsen

---

**Scenario**: Dela annons via url

**Givet**  att en arbetssökande besöker startsidan

**Och** den arbetssökande klickar på en länk till en jobbannons

**När** den arbetssökande klickar på en knapp för att dela jobbannonsen

**Så** visas en permanent url till den aktuella jobbannonsen

---

**Scenario**: Visa annons via permanent länk

**Givet**: att en arbetssökande har en permanent url till en jobbannons

**När**: den arbetssökande surfar till urlen

**Så**: visas jobbannonsen för den aktuella urlen

---

### **Egenskap**: _Sparade annonser_
> För att göra appen mer värdefull för arbetssökande ska man kunna spara annonser för att snabbt kunna komma tillbaka till dem.

---

**Scenario**: Spara annons

**Givet**: att en arbetssökande besöker startsidan

**När**: den arbetssökande klickar på en länk till en jobbannons

**Och**: klickar på en knapp för att spara jobbannonsen

**Så**: sparas jobbannonsen i den arbetssökandes webbläsare

---

**Scenario**: Lista sparade annonser

**Givet**: att en arbetssökande besöker startsidan

**Och**: att den arbetssökande har sparat en jobbannons

**Så**: visas den sparade annonsen i en lista

---

**Scenario**: Visa sparad annons

**Givet**: att en arbetssökande besöker startsidan

**Och**: att den arbetssökande har sparat en jobbannons

**När**: den arbetssökande klickar på den sparade jobbannonsen

**Så**: visas detaljerna för den valda jobbannonsen

---

### **Egenskap**: _Dela listningar_
> Utöver att dela jobbannonser så kan det vara användbart att kunna dela hela listningar.

---

**Scenario**: Dela listning via url

**Givet**: att en arbetssökande besöker startsidan

**När**: den arbetssökande klickar på en knapp för att dela listningen

**Så**: visas en permanent url till den aktuella listningen

---

**Scenario**: Visa listning via permanent länk

**Givet**: att en arbetssökande har en permanent url till en listning

**När**: den arbetssökande surfar till urlen

**Så**: visas listningen för den aktuella urlen

---

## Egenskap: Förbättrad sökning
> Det är svårt att hitta rätt annonser om man inte vet exakt vilket yrke man letar efter. Därför ska vi implementera en förslagsmotor som vid inmatning av sökord visar förslag på yrkesbenämningar att söka efter.

---

**Scenario**: Förslag på yrken (autocomplete) vid sökning

**Givet**: att en arbetssökande besöker startsidan

**När**: den arbetssökande matar in minst 3 tecken

**Så**: visas en lista med de yrkesbenämningar som börjar på samma tecken

---

**Scenario**: Val av yrkesförslag

**Givet**: att en arbetssökande besöker startsidan

**Och**: har matat in minst 3 tecken i sökfältet

**Och**: att förslag på yrkesbenämningar visas

**När**: den arbetssökande klickar på ett utav förslagen

**Så**: visas en listning med annonser baserad på sökning av den valda yrkesbenämningen

---

### **Egenskap**: _Filtrering_
> Det finns många annonser i platsbanken, för att göra verktyget ännu mer relevant för användarna ska vi tillföra filtrering av listningen på kommun.

---

**Scenario**: Kontroll för att filtrera listning

**Givet**: att en arbetssökande besöker startsidan

**Och**: att det finns en listning med annonser från fler än 1 kommun

**Så**: visas en kontroll för att välja någon utav eller ingen av kommunerna i listningen

---

**Scenario**: Filtrera listning på kommun

**Givet**: att en arbetssökande besöker startsidan

**Och**: att det finns en listning med annonser från fler än 1 kommun

**När**: den arbetssökande väljer en kommun från filterkontrollen

**Så**: visas endast annonerna från vald kommun

### **Egenskap**: _Visa annonser från hela landet_
> Inför: releasen av slutversionen av appen till resten av Sverige behöver vi lägga till möjlighet att lista jobbannonser från hela landet.

---

**Scenario**: Möjlighet att välja bland alla tillgängliga län

**Givet**: att en arbetssökande besöker startsidan

**Så**: visas en meny där alla tillgängliga län finns listade

---