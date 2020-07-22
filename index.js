require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path")

const usersRouter = require('./routes/auth');
const pollsRouter = require('./routes/poll');


const handle = require('./handlers');

const app = express();
const PORT = process.env.PORT ||5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/polls', pollsRouter);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(handle.error);



if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
