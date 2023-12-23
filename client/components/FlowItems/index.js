import React from 'react';

import RitualCategoriesList from '../RitualCategoriesList';

const flow = [
  {
    id: 1,
    title: 'Life Missions',
    text: 'Life Missions: What is everything you want to achieve before you die? Answer in the form "verb-achievement", like "create the most useful app in the world" or "play the Star-Spangled Banner like Jimi Hendrix".',
    responseCount: 10,
  },
  {
    id: 2,
    title: 'Current Mission',
    text: 'Pick ONE thing to focus on until it is done. This will be your mission until it is done!',
  },
  {
    id: 3,
    title: 'Life Categories',
    text: 'Choose which of your life categories this ritual will live in. But we got you for the first one: it be growth!',
    component: (
      <>
        <RitualCategoriesList />
      </>
    ),
  },
  {
    id: 4,
    title: 'Name ritual',
    text: 'Name the foundational ritual you must repeat to become there person who achieves this mission. You are what you consistently do!',
  },
  {
    id: 5,
    title: 'Gear',
    text: 'What do you need to do this habit? Think deeply: "laptop, charger, internet" or "guitar, tuner, ipad, internet" ',
    responseCount: 10,
  },
  {
    id: 6,
    title: 'Location',
    text: 'Where will you do this habit? "anywhere quiet" or "in the closet"',
  },
  {
    id: 7,
    title: 'Date & Time',
    text: 'Date & Time: You need to repeat this habit consistently for success - when will you start (how about today?!) and what days of the week will you choose?',
  },
  {
    id: 8,
    title: 'Frequency',
    text: 'You need to repeat this habit consistently for success - when will you start (how about today?!) and what days of the week will you choose?',
  },
  {
    id: 9,
    title: 'Duration',
    text: 'How long will this take each time? We got you here - unless you disagree. Two hours give you enough time to get into deep focus mode, not so much you get wiped out. Two hours it is.',
  },
  {
    id: 10,
    title: 'Create your ritual',
    text: 'Add the step-by-step, by-you-for-you guide to doing this ritual. You can add as many steps as you need. You can add links to steps that need a soundtrack, or a how-to video. If you need a tool that is not offered, let me know. Select the tools you need, then you can add them to the individual steps.',
  },
];

export default flow;
