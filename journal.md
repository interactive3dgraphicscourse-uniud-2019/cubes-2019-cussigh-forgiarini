26.03.2019
=============
Iniziato il progetto.

Abbiamo scelto di utilizzare il codice con le texture e l'illuminazione.

Abbiamo scelto di separare in file separati il contenuto del file "startingCode-withLights.html" per una migliore organizzazione del codice:
* Le librerie utilizzate vengono contenute nella cartella "lib".
* I diversi script scritti da noi sono contenuti nella cartella "scripts".
* I fogli di stile sono contenuti nella cartella "styles".

Aggiunta la versione non minificata del file contenente la libreria Three.js per una migliore chiarezza dei possibili errori.

Aggiornato il metodo di caricamento delle texture: utilizzando il codice fornito nel codice d'inizio veniva stampato un warning di metodo obsoleto. 

![Warning nel caricamento delle texture](/journalImages/textureLoaderWarning.jpg "Console Warning")

Aggiornato il file "OrbitControls" con la versione più recente scaricata dal [repositiory di three js](https://github.com/mrdoob/three.js)

Aggiunto un file contenente funzioni generali.

27.03.2019
=============
Abbiamo scelto di creare un parser per leggere da file i cubi e i diversi oggetti all'interno della scena.

Dopo vari tentativi e problemi, abbiamo optato per rimuovere il parser in favore di funzioni preimpostate che generano gli oggetti nella scena in base ai parametri passati. 

Creata una funzione che crea dei cubi di lato 1 posizionati nel centro dello spazio a partire dalle texture presenti nella cartella "texture". Le Mesh dei cubi generati vengono salvate in un array che ha la funzione di "palette" dei cubi disponibili.

Creata una funzione che genera una griglia con tutti i cubi che si possono utilizzare all'interno della scena.

28.03.2019
=============
Create le funzioni geometriche di base per anelli e rettangoli

Creata la funzione per la generazione di alberi di grandezza e colore impostabili

Modificate tali funzioni per supportare l'utilizzo di due colori, in modo da ottenere alberi più realistici grazie all'utilizzo randomico, ma parzialmente controllabile, del secondo colore

29.03.2019
=============
Create le funzioni per la creazione di anatre, maiali e mucche

30.03.2019
=============
Refactoring del codice, diviso in diversi file per maggiore chiarezza

Create le funzioni per generare stalle e tetti, parametriche su dimensioni e colore

31.03.2019
=============
Creata la funzione per generare il mulino, parametrica su dimensioni e colore. Predisposta all'animazione sulle pale.

