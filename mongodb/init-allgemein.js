// Get 'corpus' db
db = new Mongo().getDB("corpus");

// Create the collection
db.createCollection("allgemein", { capped: false });

// Create the collection
db.createCollection("allgemein", { capped: false });
// Create Allgemein
db.allgemein.insertOne({
  botName: "questMe",
  selectedIcon: {
    name: "Bot picture 01",
    condition: true,
    src: "assets/images/Bot Picture.png",
  },
});
