// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//          next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Chek back soon!')
// });

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {expiresIn: '10 days'});
//     console.log(token);

//     const data = jwt.verify(token, 'thisismynewcourse');

//     console.log(data);
// }

//myFunction();


// const testMyFunc = async () => {
//     // const myTask = await  Task.findById({ _id: '5d1f0de306d5a95c50f13b07' });
//     // console.log('------------------------------------------------------------')
//     // await myTask.populate('owner').execPopulate();
//     // console.log(myTask);

//     const user = await User.findById('5d1af15c6277db1444e758cd');
//     await user.populate('tasks').execPopulate();
//     //console.log(user.tasks)
// }

//testMyFunc();

// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document'), true);
//         }
//         return cb(undefined, true);
//     }
// })


// app.post('/upload', upload.single('myUpload'), (req, res) => {
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message});
// });