

db.container.drop();
// Create User
db.createUser({
  user: "root",
  pwd: "toor",
  roles: [
    {
      role: "readWrite",
      db: "dataC",
    },
  ],
});


