var x = 4;

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (x % 2 == 0) {
            resolve([1,4,7]);
        }
        else {
            reject('Shalom, you are rejected!');
        }
    }, 1000);
})

doWorkPromise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log('Error: ' + error)
});