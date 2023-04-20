const express = require('express');
const port = 3009;
const bodyParser = require('body-parser');

const { generateId } = require('./utils/string');
console.log('generateId:', generateId);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
