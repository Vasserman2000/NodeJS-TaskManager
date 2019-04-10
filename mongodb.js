const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';





MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    
    // delete many
    // db.collection('users').deleteMany({age: 39}).then((result) => {
    //     console.log(result);
    // }).catch(error);


    // delete one:
    db.collection('tasks').deleteOne({
        description: 'Visit parents'
    }).then((result) => {
        console.log(result.result);
    }).catch((error) => {
        console.log(error);
    });

    client.close();
});