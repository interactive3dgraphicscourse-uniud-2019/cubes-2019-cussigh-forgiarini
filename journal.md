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
Si è pensato di utilizzare una matrice a tre dimensioni per avere un miglior controllo della posione degli oggetti nel mondo, tuttavia l'implementazione eseguita era troppo onerosa come risorse computazionali, pertanto l'idea è stata abbandonata.

Create le funzioni geometriche di base per anelli e rettangoli

Creata la funzione per la generazione di alberi di grandezza e colore impostabili

Modificate tali funzioni per supportare l'utilizzo di due colori, in modo da ottenere alberi più realistici grazie all'utilizzo randomico, ma parzialmente controllabile, del secondo colore

29.03.2019
=============
Create le funzioni per la creazione di anatre, maiali e mucche

30.03.2019
=============
Ci siamo accorti che le ombre degli oggetti non venivano calcolate al di fuori di una zona definita, pertanto, dopo aver capito come vengono calcolate, abbiamo impostato la luce direzionale in modo tale da vedere le ombre di tutti gli oggetti in scena.

Refactoring del codice, diviso in diversi file per maggiore chiarezza

Create le funzioni per generare stalle e tetti, parametriche su dimensioni e colore

31.03.2019
=============
Creata la funzione per generare il mulino, parametrica su dimensioni e colore. Predisposta all'animazione sulle pale.

01.04.2019
=============
Creata la funzione per generare il terreno a partire da un'immagine in scala di grigi
Iniziata la gestione delle animazioni. La prima di esse consite nell'implementare il movimento di un oggetto attorno ad un asse di rotazione. Si vuole implementare anche l'opzione del moto sinusoidale in verticale.

02.04.2019
=============
Ideata l'animazione del maiale dentro il recinto: esso deve muoversi verso il muro e rimbalzare con urto elastico.

03.04.2019
=============
Dopo aver risolto il problema del maiale che gira su se stesso (era dovuto al mancato controllo del già avvenuto cambio di direzione) si è creata la scena.

04.04.2019
=============
Aggiunta la possibilità di abilitare o disabilitare la visione degli assi, zone dove vengono calcolate le ombre e statistiche sulla scena (framerate, tempo di calcolo di un frame, occupazione di memoria).

Risolto un problema nella generazione del terreno: in alcuni casi l'acqua veniva generata con un blocco di colore sbagliato.

Cambiate le texture.

Creata un'animazione per il movimento di un oggetto lungo una linea definita da un punto di partenza e uno di arrivo.

05.04.2019
=============
Risolto il problema dello sguardo della anatra: le rotazioni non venivano fatte nel modo giusto, abbiamo scelto di utilizzare il metodo lookAt() dell'oggetto THREE.Object3D().

Generalizzato il movimento dal semplice percorso da un punto A a B. Ora è possibile indicare un insieme di punti da percorre come tragitto e indicare se eseguire il tragitto più volte o semplicemente fermarsi quando l'oggetto è arrivato a destinazione.

Aggiunta la possibilità di muoversi orizzontalmente in modo cosinusoidale durante il tragitto.

Aggiunte le ali alle papere e la possibilità di indicare se esse debbano essere aperte o chiuse.

Aggiunta un'animazione alla luce direzionale per simulare il sole durante una giornata.

Creato un modello per il sole e posizionato leggermente dietro la luce direzionale.

06.04.2019
=============
Risolto un problema nel movimento degli oggetti con movimenti sinuosoidali: a velocità diverse l'oggetto spariva dalla scena.