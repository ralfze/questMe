// Get 'corpus' db
db = new Mongo().getDB("corpus");

// Create the collection
db.createCollection("interna", { capped: false });

// Insert db in Corpus
db.interna.insertOne({
  name: "Interna",
  locale: "de-DE",
  data: [
    {
      intent: "interna.nachricht.spezialtermin",
      utterances: [
       "Wann ist der nächste Spezialtermin bei dem ich teilnehmen kann und wo findet er statt",
       "Welche Informationen gibt es zum nächsten Spezialtermin und wo wird dieser sehr wahrscheinlich stattfinden"
      ],
      answers: [
        "Der nächste Spezialtermin ist nächste Woche geplant und muss noch auf einen Tag festgelegt werden, der Ort ist bisher noch nicht festgelegt",
        "Ein Termin für den nächsten Spezialtermin ist für nächste Woche angesetzt"
      ],
    },
  ],
});
