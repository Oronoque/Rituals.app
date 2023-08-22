const express = require('express');
const port = 9999;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const db = require('../app/models');

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/ritual.routes')(app);
require('./routes/ritualCategory.routes')(app);

// hello rituals
app.get('/', (req, res) => {
  res.send('Hello Rituals!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
