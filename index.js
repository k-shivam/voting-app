require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path")

const routes = require('./routes');

const handle = require('./handlers');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);;


app.use(handle.error);

app.use(express.static('client/build'));

//if (process.env.NODE_ENV === 'production') {
//    app.get('*', (req, res) => {
//        res.sendFile(path.join(__dirname + '/client/build/index.html'));
//    });
//}

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
