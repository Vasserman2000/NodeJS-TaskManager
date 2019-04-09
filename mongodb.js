const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';





MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);


    // select one
   db.collection('users').findOne({
       name: 'Lea'
   }, (error, user) => {
       if (error) {
           return console.log('Unable to fetch');
       }

       console.log(user);
   });

   // select multiple
   db.collection('users').find({age: 33}).toArray((error, users) => {
       console.log(users);
   });

   // count fetched records
   db.collection('users').find({age: 33}).count((error, users) => {
       console.log(users);
    });

    // fetch by id
    db.collection('tasks').findOne({_id: new ObjectID('5cacaadbe01a29371ccc5145')}, (error, task) => {
        console.log(task);
    });

    // fetch multiple by parameter
    db.collection('tasks').find({completed: false}).toArray((error, task) => {
        console.log(task);
    });

    client.close();
});