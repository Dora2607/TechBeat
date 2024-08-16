# TechBeat

TechBeat è un'applicazione basata su Angular progettata per democratizzare la diffusione di informazioni tecnologiche attraverso l'integrazione con il servizio Hacker News.

## Demo 

![Demo1](/img-readme/demo%201.png)
 Schermata iniziale: Questa immagine mostra la schermata iniziale dell’applicazione.
![Demo2](/img-readme/demo%202.png)
 Gli utenti possono cliccare su uno dei topic per visualizzare le notizie corrispondenti.
![Demo3](/img-readme/Demo%203.png)
 Cliccando su questo pulsante, gli utenti possono caricare e leggere altre notizie, permettendo di visualizzare più articoli oltre ai primi 10 inizialmente mostrati.

## Links

[TechBeat](https://techbeat-edadf.web.app): per provare l'applicazione.


## Prerequisiti

Prima di iniziare, assicurati di avere i seguenti requisiti:

- Node.js (versione < 22.00.00 a causa di problemi di compatibilità con Angular).
- Npm (viene installato con node)
- Angular CLI versione 18.1.3.

## Tecnologie utilizzate

L’applicazione è stata sviluppata utilizzando:

- Angular CLI versione 18.1.3: Il framework Angular CLI è stato utilizzato per creare l’applicazione e gestire i componenti, i servizi e le altre parti dell’applicazione.
- Angular Material: Questa libreria è stata utilizzata per la modellazione dei componenti dell’interfaccia utente. Tutte le API di Angular Material sono raggruppate nella cartella shared/material.
- ESLint e Prettier: Questi strumenti sono stati utilizzati per formattare il codice e mantenere uno stile di codice coerente. Lanciare da terminale il comando ng lint.

## Installazione

Per installare TechBeat, segui questi passaggi:

1. Clona il repository

2. Naviga nella directory del progetto:

   ```bash
   cd techbeat
   ```

3. Installa le dipendenze:
   ```bash
   npm install
   ```

## Utilizzo

Per eseguire TechBeat in locale:

1. Avvia l'applicazione:

   ```bash
   ng serve
   ```

2. Apri il tuo browser e naviga a `http://localhost:4200/`.

## Funzionalità

TechBeat include diverse funzionalità, tra cui:

- **Toolbar/Navbar**: L'applicazione presenta una toolbar o navbar, a seconda del dispositivo in uso, che permette di scegliere il topic d'interesse.
- **Selezione del Topic**: Gli utenti possono scegliere tra vari topic come Top Stories, New Stories, Best Stories, Ask Stories, Show Stories, e Job Stories.
- **Recupero delle Notizie**: Cliccando su un topic, viene contattato un servizio API che recupera un array numerico contenente gli ID delle notizie.
- **Visualizzazione delle Notizie**: Utilizzando gli ID, una seconda chiamata API recupera le notizie associate. Gli utenti possono vedere il titolo, l'autore, il giorno e l'ora della notizia.
- **Read More**: Cliccando su "Read More", gli utenti vengono indirizzati alla pagina completa della notizia.
- **Caricamento delle Notizie**: Ogni topic presenta inizialmente 10 notizie (le più recenti). Gli utenti possono caricare altre 10 notizie cliccando sul bottone "Load More" e continuare a caricare notizie finché non ve ne sono più.

## Struttura del Progetto

Il progetto è suddiviso in più moduli per una migliore organizzazione e manutenibilità del codice.
La struttura del progetto è la seguente:

- **Shared**: Questo modulo contiene componenti e servizi condivisi tra diverse parti dell'applicazione.

  - **Toolbar**: La componente toolbar che gestisce la navigazione e l'interazione dell'utente.
  - **Animations**: Il file TypeScript per le animazioni da applicare alle componenti.
  - **Material**: Il modulo che contiene tutte le API di Angular Material utilizzate nell'applicazione.


- **Home**: Questo modulo contiene la componente principale per la visualizzazione delle notizie.

  - **News Component**: La componente che visualizza le notizie recuperate dalle API.

Inoltre, il progetto include due directory principali:

- **Services**: Questa directory contiene i servizi utilizzati per l'applicazione.

  - **API Service**: Il servizio che gestisce le chiamate API per recuperare i dati.
  - **News Service**: Il servizio che gestisce le notizie e l'interazione con `ApiService` per recuperare e visualizzare le notizie

- **Models**: Questa directory contiene le interfacce per modellare le risposte delle chiamate API.
  - **API Response Model**: L'interfaccia che definisce la struttura dei dati ricevuti dalle chiamate API.

### Servizi

#### ApiService

Il servizio `ApiService` è responsabile della comunicazione con l'API di Hacker News per recuperare i dati necessari. Ecco una descrizione dei metodi contenuti in questo servizio:

- **getNumericIdArray(apiType: string): Observable<number[]>**
  Questo metodo prende come parametro un tipo di API (ad esempio, `topstories`, `newstories`, ecc.) e restituisce un array di numeri che rappresentano gli ID delle notizie. Utilizza il metodo `get` di `HttpClient` per effettuare una richiesta GET all'URL dell'API di Hacker News e recuperare l'array di ID.

- **getResponseApi(id: number): Observable<ApiResponse>**
  Questo metodo prende come parametro un ID di una notizia e restituisce un oggetto `ApiResponse` che contiene i dettagli della notizia associata a quell'ID. Utilizza il metodo `get` di `HttpClient` per effettuare una richiesta GET all'URL dell'API di Hacker News e recuperare i dettagli della notizia.

#### NewsService

Il servizio `NewsService` è responsabile della gestione delle notizie e dell'interazione con `ApiService` per recuperare e visualizzare le notizie. Ecco una descrizione dei metodi contenuti in questo servizio:

- **setApyType(apiType: string)**
  Questo metodo imposta il tipo di API (ad esempio, `topstories`, `newstories`, ecc.) e resetta le notizie attualmente visualizzate. Utilizza `BehaviorSubject` per aggiornare il tipo di API e chiamare il metodo `resetNews` per resettare le notizie.

- **fetchApi(apiType: string)**
  Questo metodo chiama `getNumericIdArray` di `ApiService` per recuperare l'array di ID delle notizie per il tipo di API specificato. Una volta recuperato l'array, chiama il metodo `getNews` per ottenere i dettagli delle notizie.

- **getNews()**
  Questo metodo recupera i dettagli delle notizie utilizzando gli ID delle notizie. Prende i primi 10 ID dall'array di ID e chiama `getResponseApi` di `ApiService` per ottenere i dettagli delle notizie. Aggiunge le notizie recuperate a `displayNewsSubject` e aggiorna l'indice per caricare altre notizie in futuro.

- **getDisplayedNews(): Observable<ApiResponse[]>**
  Questo metodo restituisce un `Observable` che contiene le notizie attualmente visualizzate. Utilizza `BehaviorSubject` per mantenere e aggiornare l'elenco delle notizie visualizzate.

- **setFineArraay(): Observable<boolean>**
  Questo metodo restituisce un `Observable` che indica se sono state caricate tutte le notizie disponibili. Utilizza `BehaviorSubject` per mantenere e aggiornare questo stato.

- **resetNews()**
  Questo metodo resetta l'indice delle notizie, imposta `fineArraySubject` a `false` e svuota `displayNewsSubject` per preparare il servizio a caricare nuove notizie.

### Componenti

#### AppComponent

La componente `AppComponent` è la componente principale dell’applicazione. Ecco una descrizione dei metodi contenuti in questa componente:

- **ngOnInit()**
  Questo metodo viene chiamato al momento dell’inizializzazione della componente. Imposta il titolo della pagina e aggiunge i meta tag per la descrizione e le parole chiave della pagina utilizzando i servizi `Meta` e `Title`.

#### ToolbarComponent

La componente `ToolbarComponent` gestisce la toolbar o navbar dell’applicazione. Ecco una descrizione dei metodi contenuti in questa componente:

- **sidenav.toggle()**
  Questo metodo viene chiamato quando l’utente clicca sul pulsante del menu per aprire o chiudere il sidenav.

- **sidenav.close()**
  Questo metodo viene chiamato quando l’utente clicca su un elemento del menu laterale per chiudere il sidenav.

#### NewsComponent

La componente `NewsComponent` gestisce la visualizzazione delle notizie. Ecco una descrizione dei metodi contenuti in questa componente:

- **ngOnInit()**
  Questo metodo viene chiamato al momento dell’inizializzazione della componente. Recupera il tipo di API dai parametri della route e imposta il titolo della sezione. Chiama i metodi `setApyType` e `fetchApi` del servizio `NewsService` per recuperare le notizie. Si sottoscrive agli osservabili `getDisplayedNews` e `setFineArraay` per aggiornare la lista delle notizie visualizzate e verificare se sono state caricate tutte le notizie disponibili.

- **setSectionTitle(apiType: string)**
  Questo metodo imposta il titolo della sezione in base al tipo di API (ad esempio, `newstories`, `topstories`, ecc.).

- **loadMoreNews()**
  Questo metodo chiama il metodo `getNews` del servizio `NewsService` per caricare altre notizie.

- **ngOnDestroy()**
  Questo metodo viene chiamato al momento della distruzione della componente. Completa il subject `destroy$` per evitare memory leaks.



## Running unit tests
Digita `ng test` per eseguire gli unit tests via Karma. Per generare un report sulla coverage del codice, puoi utilizzare il comando `ng test --code-coverage`. Questo genererà una directory coverage nel progetto con un report HTML sulla coverage del codice.