// Get 'corpus' db
db = new Mongo().getDB("corpus");

// Create the collection
db.createCollection("einstellungen", { capped: false });

// Insert db in Corpus
db.einstellungen.insertOne({
  professor: ["Basis", "Hochschule", "Interna"],
  student: ["Basis", "Hochschule"],
  unregistered: ["Basis"],
});
