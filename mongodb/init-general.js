// Get 'corpus' db
db = new Mongo().getDB("corpus");

// Create the collection
db.createCollection("general", { capped: false });

// Create General
db.general.insertOne({
  botName: "questMe",
  selectedIcon: {
    name: "Bot picture 00",
    condition: true,
    src: "assets/images/chatbot_00.png",
  },
});
