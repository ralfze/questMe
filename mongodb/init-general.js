// Get 'corpus' db
db = new Mongo().getDB("corpus");

// Create the collection
db.createCollection("general", { capped: false });
// Create General
db.general.insertOne({
  botName: "questMe",
  selectedIcon: {
    name: "Bot picture 01",
    condition: true,
    src: "assets/images/Bot Picture.png",
  },
});
