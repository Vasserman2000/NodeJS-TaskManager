const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';





MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    
    // update one:
    db.collection('users').updateOne({
        _id: new ObjectID('5caca893c620d141dca18da2')
    }, {
        $set: {
            status: 'Married'
        },
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error);
    });

    // update many:
    db.collection('tasks').updateMany({
        completed: true
    }, {
        $set: {
            completed: false
        }
    }).then((result) => {
        console.log(result['result']);
    }).catch((error) => {
        console.log(error);
    });

    client.close();
});