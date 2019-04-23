const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager-api';

const MongoClient = require('mongodb')

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);


    // insert one
    // db.collection('users').insertOne({
    //     name: 'Moshe',
    //     age: 33
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user!');
    //     }
    //     console.log(result.ops);
    // });


    // insert many
    // db.collection('users').insertMany([
    //     {
    //         name: 'Elisha',
    //         age: 18
    //     },
    //     {
    //         name: 'Lea',
    //         age: 15,
    //         status: 'Married'
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert to db.')
    //     }
    //     console.log(result.insertedIds);
    // });

    db.collection('tasks').insertMany([
        {
            description: 'make a coffee',
            completed: true
        }
    ], (error, result) => {
            if (error) {
                return console.log('Unable to insert to db.')
            }
            console.log(result.insertedIds);});
      
    client.close();
});