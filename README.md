README--------------------------------------------------------
Tecnologie utilizzate: 
(Front-End)React JS: v19.1.1
(Back-End)Spring Boot: v3.5.6
(Control Panel) Xampp: v3.3.0
(DBMS) MariaDB: v10.4.32
(UI - DB) phpMyAdmin: v5.2.2
(Web Server) Apache: v2.4.58
Node js: v22.20.0
npm: 10.9.3

Step per l'esecuizone:
Xampp:
Come prima cosa si necessita l'avvio di Xampp e successivamente dei servizi MySQL e Apache.
Digitando "http://localhost/phpmyadmin/" ci si ritrova nell'interfaccia grafica phpMyAdmin.
Si necessita la creazione di un database con il nome "todo_db", mentre, la tabella "Task" verrà 
creata automaticamente grazie alla proprietà: "spring.jpa.hibernate.ddl-auto=update".

Spring Boot:
A questo punto bisogna avviare il back-end da VSCode facendo "run" dopo esserci posizionati nell'application principale "ToDoBackendApplication.java"; verificare che l'ultima riga di risposta del terminale sia: "Started ToDoBackendApplication in x seconds".

React JS:
Per avviare il front-end da VSCode si avvia un terminale nella cartella "src" e si digita successivamente "npm run dev"; a questo punto React JS dovrebbe partire mostrando nella finestra del terminale il link da seguire per il sito vero e proprio (nel caso della versione vite utilizzata la porta di default è: "5173"
ma potrebbe variare da versione a versione. Se dovesse essere diversa si necessita la modifica della Annotation: "@CrossOrigin(origins = "http://localhost:porta_effettiva/")" nel file TaskController.java della cartella "src/mainjava/controller"

//Utilizzo applicazione effettiva----------------------------------------------------------------------------

L'utilizzo è abbastanza intuitivo; si ha una sezione latelare con due form che servono rispettivamente per l'aggiunta di un task e la modifica (per modificare si fa click sul pulsante con il simbolo della penna accanto al task effettivo); la sezione centrale mostra la lista dei task (con rispettivi tasti di completamento, cancellazione e modifica); la sezione di sinistra mostra un resoconto dei task da completare, completati e scaduti. I task risultano in scadenza (colore giallo/arancione) quando sono vicini sotto i 3 giorni dalla scadenza; risultano verdi quando sono stati completati e rossi quando sono scaduti.  





