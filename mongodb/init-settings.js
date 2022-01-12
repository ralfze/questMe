// Get 'corpus' db
db = new Mongo().getDB("corpus");

// Create the collection
db.createCollection("settings", { capped: false });

// Insert db in Corpus
db.settings.insertOne({
  professor: ["Basis", "Hochschule", "Interna"],
  student: ["Basis", "Hochschule"],
  unregistered: ["Basis"],
});
