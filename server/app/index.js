const express = require('express');
const port = 3009;
const bodyParser = require('body-parser');

const { generateId } = require('./utils/string');
console.log('generateId:', generateId);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [];

const login = [
  {
    id: generateId(),
    username: 'FatRandy',
    password: 'password123',
  },
  {
    id: generateId(),
    username: 'FatterRandy',
    password: 'password456',
  },
  {
    id: generateId(),
    username: 'FattestRandy',
    password: 'password789',
  },
];

const rituals = [
  {
    id: generateId(),
    name: 'chest day',
    category: 'fitness',
  },
  {
    id: generateId(),
    name: 'morning',
    category: 'daily',
  },
  {
    id: generateId(),
    name: 'research reading',
    category: 'deep work',
  },
];

const categories = [
  {
    id: generateId(),
    name: 'fitness',
  },
  {
    id: generateId(),
    name: 'daily',
  },
  {
    id: generateId(),
    name: 'deep work',
  },
];

const ritualSteps = [
  {
    id: generateId(),
    ritualsName: 'chest day',
    name: 'bench press',
    count: '4',
    count_unit: 'reps',
    burden: '225',
    burden_unit: 'lbs',
  },
  {
    id: generateId(),
    ritualsName: 'morning',
    name: 'Cold Shower',
    duration: '5',
    duration_unit: 'minutes',
  },
  {
    id: generateId(),
    ritualsName: 'research reading',
    name: 'Read',
    title: 'The Checklist Manifesto',
    duration: '45',
    duration_unit: 'minutes',
    notes: 'Chapter 7 - how checklists save lives. ',
  },
];

// Define the register endpoint
app.post('/register', (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  //returns error is username is already taken
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  //return error if passwords do not match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // create new user and add to user array
  const newUser = {
    id: generateId(),
    email,
    username,
    password,
  };
  users.push(newUser);

  // Send success message
  return res.status(201).json({ message: 'User created successfully' });
});

// Define the login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = login.find((user) => user.username === username && user.password === password);

  if (!user) {
    // If the user is not found, return an error response
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // If the user is found, return a success response
  return res.status(200).json({ message: 'Success' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// hello rituals
app.get('/', (req, res) => {
  res.send('Hello Rituals!');
});

// list all rituals
app.get('/api/rituals', (req, res) => {
  res.send(rituals);
});

// list one ritual
app.get('/api/rituals/:id', (req, res) => {
  const { id } = req.params;

  const ritual = rituals.find((ritual) => ritual.id === id);

  if (ritual) {
    return res.send(ritual);
  }

  return res.status(404).send();
});

// create one ritual
app.post('/api/rituals', (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).send('params_missing');
  }

  rituals.push({
    id: generateId(),
    name,
    category,
  });

  return res.send({ success: true, data: rituals });
});

// delete one ritual
app.delete('/api/rituals/:id', (req, res) => {
  const { id } = req.params;

  const matchingIndex = rituals.findIndex((ritual) => ritual.id === id);

  if (matchingIndex !== -1) {
    rituals.splice(matchingIndex, 1);
    return res.send({ success: true, data: rituals });
  }

  return res.status(404).send();
});

// todo: update one ritual
// update one ritual
app.put('/api/rituals/:id', (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const ritualIndex = rituals.findIndex((ritual) => ritual.id === id);

  if (ritualIndex === -1) {
    return res.status(404).send();
  }

  const updatedRitual = {
    id,
    name: name || rituals[ritualIndex].name,
    category: category || rituals[ritualIndex].category,
  };

  rituals[ritualIndex] = updatedRitual;

  return res.send({ success: true, data: updatedRitual });
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// list all categories
// GET www.app.com/api/categories ==> [{},{}]
app.get('/api/categories', (req, res) => {
  res.send(categories);
});

// // list one category
// GET www.app.com/api/categories/:id ==> {}
app.get('/api/categories/:id', (req, res) => {
  const { id } = req.params;

  const category = categories.find((category) => category.id === id);

  if (category) {
    return res.send(category);
  }

  return res.status(404).send();
});

// // create one category
// POST www.app.com/api/category
// {
//   name,
//   category,
// }
app.post('/api/categories', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('params_missing');
  }

  categories.push({
    id: generateId(),
    name,
  });

  return res.send({ success: true, data: categories });
});

// // update one category
// PUT www.app.com/api/category/1
// {
//   name,
//   category,
// }
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const categoryIndex = categories.findIndex((category) => category.id === id);

  if (categoryIndex === -1) {
    return res.status(404).send();
  }

  const updatedCategory = {
    id,
    name: name || categories[categoryIndex].name,
  };

  categories[categoryIndex] = updatedCategory;

  return res.send({ success: true, data: updatedCategory });
});

// // delete one category
// DELETE www.app.com/api/category/1
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;

  const matchingIndex = categories.findIndex((category) => category.id === id);

  if (matchingIndex !== -1) {
    categories.splice(matchingIndex, 1);
    return res.send({ success: true, data: categories });
  }

  return res.status(404).send();
});

// create api routes for ritualSteps
// list all ritualSteps for a ritual
app.get('/api/rituals/:ritualName/steps', (req, res) => {
  const { ritualName } = req.params;

  const ritual = rituals.find((ritual) => ritual.name === ritualName);

  if (!ritual) {
    return res.status(404).send('Ritual not found');
  }

  const steps = ritualSteps.filter((step) => step.rituals.name === ritualName);

  res.send(steps);
});

// return one ritualStep for a ritual
app.get('/api/rituals/:ritualName/steps/:id', (req, res) => {
  const { ritualName, id } = req.params;

  const ritual = rituals.find((ritual) => ritual.name === ritualName);

  if (!ritual) {
    return res.status(404).send('Ritual not found');
  }

  const step = ritualSteps.find((step) => step.rituals.name === ritualName && step.id === id);

  if (!step) {
    return res.status(404).send('Step not found');
  }

  res.send(step);
});

// create one ritualStep for a ritual
app.post('/api/rituals/:ritualName/steps', (req, res) => {
  const { ritualName } = req.params;
  const { name, duration, duration_unit, count, count_unit, burden, burden_unit, notes } = req.body;

  const ritual = rituals.find((ritual) => ritual.name === ritualName);

  if (!ritual) {
    return res.status(404).send('Ritual not found');
  }

  const step = {
    id: generateId(),
    rituals: { name: ritualName },
    name,
    duration,
    duration_unit,
    count,
    count_unit,
    burden,
    burden_unit,
    notes,
  };

  ritualSteps.push(step);

  res.send(step);
});

// delete one ritualStep for a ritual
app.delete('/api/rituals/:ritualName/steps/:id', (req, res) => {
  const { ritualName, id } = req.params;

  const ritual = rituals.find((ritual) => ritual.name === ritualName);

  if (!ritual) {
    return res.status(404).send('Ritual not found');
  }

  const stepIndex = ritualSteps.findIndex(
    (step) => step.rituals.name === ritualName && step.id === id,
  );

  if (stepIndex === -1) {
    return res.status(404).send('Step not found');
  }

  ritualSteps.splice(stepIndex, 1);

  res.send({ success: true, data: ritualSteps });
});

// update one ritualStep for a ritual
app.put('/api/rituals/:ritualName/steps/:id', (req, res) => {
  const { ritualName, id } = req.params;
  const { name, duration, duration_unit, count, count_unit, burden, burden_unit, notes } = req.body;

  const ritual = rituals.find((ritual) => ritual.name === ritualName);

  if (!ritual) {
    return res.status(404).send('Step not found');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
