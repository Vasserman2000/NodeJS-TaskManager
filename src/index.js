const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send(req);
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

