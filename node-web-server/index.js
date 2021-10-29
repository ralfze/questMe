const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart();/*
  const database = dock.get('database');
  await database.connect();
  // Testing Database
  /*
  const collection = database.getCollection('items');
  const items = [];
  for (let i = 0; i < 100; i += 1) {
    const item = { num: i, mod: i % 10 };
    items.push(item);
  }
  await collection.insertMany(items);
  const actual = await collection.find({ mod: 3 });
  await database.disconnect();
  console.log(actual);
*/
  const nlp = dock.get('nlp');
  await nlp.train();
  })();
