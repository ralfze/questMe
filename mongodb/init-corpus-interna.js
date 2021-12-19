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
      intent: "interna.test",
      utterances: [
       "Was ist mein Spezialtermin?"
      ],
      answers: [
        "Du hast bisher keinen Spezialtermin",
      ],
    },
  ],
});
