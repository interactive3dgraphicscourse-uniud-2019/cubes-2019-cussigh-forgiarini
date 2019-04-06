# Interactive 3d Graphics - Primo progetto

## Membri del gruppo

Cussigh Filippo - n°123413

Forgiarini Alessandro - n° fixa

## Descrizione del progetto
Il progetto prevede la realizzazione di una scena interamente modellata tramite cubi e che riprenda lo stile di Minecraft.
Si intende creare la rappresentazione di una campagna, tramite una serie di metodi personalizzabili per la creazione dei vari elementi di scena. La scena visibile mostra dunque una delle possibili implementazioni, ma tutti i suoi elementi sono parametrizzati e predisposti a essere generati in base a dimensioni (in numero di cubi unitari), colori e animazioni a piacere.

Tra le due opzioni disponibili è stata scelta la realizzazione del terreno tramite heightmap.
Sono state inoltre implementate luci ed ombre.

Le animazioni della scena vengono attivate/disabilitate con la barra spaziatrice.

## Divisione del codice
Il file principale in cui viene creata la scena è StartingCode-withLights.html.
Tutti i metodi realizzati sono stati divisi in relativi file .js in base al loro scopo.

## Scena risultante

La scena mostra un paesaggio di campagna costituito da una stalla con animali, diversi alberi, un mulino a vento, degli uccelli in volo e una papera nel laghetto.
Tutti gli oggetti sono stati creati utilizzando cubi di larghezza 1, tuttavia per non aggiungere troppo carico poligonale alcuni elementi sono stati scalati per permettere l'utilizzo di meno cubi.

![](screenshots/scene.png)

## Modelli

### Terreno
Il terreno è generato attraverso l'immagine visibile in figura. Il codice permette di caricare un'immagine in scala di grigi di qualunque dimensione. 
Il colore dei cubi viene stabilito in base al valore della heightmap, tuttavia per i cubi fuori dall'acqua è stata fatta la scelta artistica di lasciare color terra i cubi visibili solo lateralmente.

![](screenshots/terrain.png)

### Edifici e alberi
Sono stati modellati due edifici. La stalla e il mulino. Entrambi sono parametrici su dimensioni (che si traducono in numero di cubi unitari) e colori.
Il mulino è stato creato in modo da permettere la rotazione indipendente delle pale, come visibile.
Gli alberi similmente sono generati a partire dalle dimensioni che vengono passate al metodo, che determinano l'angolo con cui si allarga e stringe la chioma. Inoltre per dare maggiore realismo è previsto il passaggio di due colori e un fattore di varianza, che determina la frequenza di cubi casuali del secondo colore (metodo applicato anche in altri frangenti come il manto della mucca).

![](screenshots/tree.png)

### Animali
Sono stati modellati tre animali per dare varietà alla scena.
Dato che non si tratta di modelli geometricamente regolari, in questo caso la struttura di cubi risulta fissa, tuttavia sono possibili diverse personalizzazioni tra cui l'apertura o meno delle ali dell'anatra, o la sporadicità delle macchie della mucca.

![](screenshots/animals.png)

## Animazioni

fixa

## Costruzione della scena
La scena è stata costruita a partire dal terreno. Il terreno è stato disegnato su GIMP tramite pennelli sfumati per permettere un risultato omogeneo.
I vari oggetti di scena sono stati dunque posizionati in base al terreno scelto per costruire una scena credibile.
Sono state impostate le animazioni per gli animali, il mulino e il sole.
Infine sono stati implementati i comandi per la gestione delle animazioni.
fixa che comandi