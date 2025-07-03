export const TEST_QUESTIONS = [
  {
    id: '1',
    title: 'Reasoning Ability',
    duration: 600,
    instructions: 'Answer all reasoning questions. Each question has one correct answer.',
    questions: [
      {
        text: 'If A = 1, B = 2, what is C?',
        options: ['2', '3', '4', '5'],
        answer: '3',
        explanation: 'C is the 3rd letter of the alphabet.'
      },
      {
        text: 'Find the odd one out: Apple, Banana, Carrot, Mango',
        options: ['Apple', 'Banana', 'Carrot', 'Mango'],
        answer: 'Carrot',
        explanation: 'Carrot is a vegetable, others are fruits.'
      },
      {
        text: 'Which number comes next: 2, 4, 6, ?',
        options: ['7', '8', '9', '10'],
        answer: '8',
        explanation: 'The sequence increases by 2.'
      },
      {
        text: 'Which is the odd one out: Cat, Dog, Lion, Cow?',
        options: ['Cat', 'Dog', 'Lion', 'Cow'],
        answer: 'Lion',
        explanation: 'Lion is a wild animal, others are domestic.'
      },
      {
        text: 'If 1=3, 2=3, 3=5, 4=4, 5=4, then 6=?',
        options: ['3', '4', '5', '6'],
        answer: '3',
        explanation: 'Number of letters in the spelling of the number.'
      },
      {
        text: 'Which word does not belong: Table, Chair, Pen, Sofa?',
        options: ['Table', 'Chair', 'Pen', 'Sofa'],
        answer: 'Pen',
        explanation: 'Pen is not a piece of furniture.'
      },
      {
        text: 'If all BLOOM are FLOWER, all FLOWER are PLANT, then all BLOOM are?',
        options: ['PLANT', 'TREE', 'ROOT', 'LEAF'],
        answer: 'PLANT',
        explanation: 'BLOOM is a subset of PLANT.'
      },
      {
        text: 'Which is the odd one out: Red, Blue, Green, Apple?',
        options: ['Red', 'Blue', 'Green', 'Apple'],
        answer: 'Apple',
        explanation: 'Apple is not a color.'
      },
      {
        text: 'If 2 + 3 = 8, 3 + 7 = 27, 4 + 5 = ?',
        options: ['18', '20', '32', '36'],
        answer: '32',
        explanation: 'Multiply the numbers and add 2.'
      },
      {
        text: 'Which is the odd one out: Circle, Square, Triangle, Rectangle?',
        options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
        answer: 'Circle',
        explanation: 'Circle has no sides.'
      }
    // ...existing 10 questions...
    ]
    // Add placeholder questions to make 20
    .concat(Array.from({length: 20 - 10}, (_, i) => ({
      text: `Reasoning Placeholder Q${i+11}`,
      options: ['A', 'B', 'C', 'D'],
      answer: 'A',
      explanation: `Placeholder explanation for Reasoning Q${i+11}`
    })))
  },
  {
    id: '2',
    title: 'Quantitative Aptitude ',
    duration: 600,
    instructions: 'Answer all aptitude questions. Each question has one correct answer.',
    questions: [
      {
        text: 'What is 15% of 200?',
        options: ['20', '25', '30', '35'],
        answer: '30',
        explanation: '15% of 200 is 30.'
      },
      {
        text: 'If a train travels 60 km in 1.5 hours, what is its speed?',
        options: ['30 km/h', '40 km/h', '50 km/h', '60 km/h'],
        answer: '40 km/h',
        explanation: 'Speed = Distance/Time = 60/1.5 = 40 km/h.'
      },
      {
        text: 'What is the square root of 144?',
        options: ['10', '11', '12', '13'],
        answer: '12',
        explanation: '12 x 12 = 144.'
      },
      {
        text: 'If 5x = 20, what is x?',
        options: ['2', '3', '4', '5'],
        answer: '4',
        explanation: '5 x 4 = 20.'
      },
      {
        text: 'A shopkeeper sold an item for $120 at a loss of 20%. What was the cost price?',
        options: ['$100', '$120', '$140', '$150'],
        answer: '$150',
        explanation: 'CP = SP/(1 - loss%) = 120/0.8 = 150.'
      },
      {
        text: 'If a car covers 150 km in 3 hours, what is its average speed?',
        options: ['40 km/h', '45 km/h', '50 km/h', '55 km/h'],
        answer: '50 km/h',
        explanation: '150/3 = 50 km/h.'
      },
      {
        text: 'What is 25% of 80?',
        options: ['15', '18', '20', '22'],
        answer: '20',
        explanation: '25% of 80 is 20.'
      },
      {
        text: 'If 3 pencils cost $15, what is the cost of 7 pencils?',
        options: ['$30', '$35', '$40', '$45'],
        answer: '$35',
        explanation: '1 pencil = $5, so 7 pencils = $35.'
      },
      {
        text: 'If a = 2, b = 3, what is the value of a^b?',
        options: ['6', '8', '9', '12'],
        answer: '8',
        explanation: '2^3 = 8.'
      },
      {
        text: 'What is the next number in the series: 2, 6, 12, 20, ?',
        options: ['28', '30', '32', '36'],
        answer: '30',
        explanation: 'Add 4, 6, 8, ... to each term.'
      },
      {
        text: 'If 40% of a number is 80, what is the number?',
        options: ['100', '150', '180', '200'],
        answer: '200',
        explanation: 'Let the number be x. 0.4x = 80, so x = 200.'
      }
    // ...existing 10 questions...
    ]
    // Add placeholder questions to make 20
    .concat(Array.from({length: 20 - 11}, (_, i) => ({
      text: `Quantitative Placeholder Q${i+12}`,
      options: ['A', 'B', 'C', 'D'],
      answer: 'A',
      explanation: `Placeholder explanation for Quantitative Q${i+12}`
    })))
  },
  {
    id: '3',
    title: 'English Language',
    duration: 600,
    instructions: 'Answer all English questions. Each question has one correct answer.',
    questions: [
      {
        text: 'Choose the correct spelling:',
        options: ['Recieve', 'Receive', 'Recive', 'Receeve'],
        answer: 'Receive',
        explanation: 'The correct spelling is Receive.'
      },
      {
        text: 'What is the synonym of "Happy"?',
        options: ['Sad', 'Angry', 'Joyful', 'Tired'],
        answer: 'Joyful',
        explanation: 'Joyful is a synonym for Happy.'
      },
      {
        text: 'Fill in the blank: The sun ____ in the east.',
        options: ['rise', 'rises', 'rose', 'raising'],
        answer: 'rises',
        explanation: 'The correct verb is "rises".'
      },
      {
        text: 'Choose the antonym of "Brave":',
        options: ['Coward', 'Strong', 'Smart', 'Kind'],
        answer: 'Coward',
        explanation: 'Coward is the opposite of brave.'
      },
      {
        text: 'Which is a noun?',
        options: ['Run', 'Quickly', 'Happiness', 'Blue'],
        answer: 'Happiness',
        explanation: 'Happiness is a noun.'
      },
      {
        text: 'Choose the correct plural: "Child"',
        options: ['Childs', 'Childes', 'Children', 'Childrens'],
        answer: 'Children',
        explanation: 'The plural of child is children.'
      },
      {
        text: 'Which word is a verb?',
        options: ['Quick', 'Run', 'Blue', 'Happy'],
        answer: 'Run',
        explanation: 'Run is a verb.'
      },
      {
        text: 'Choose the correct article: ___ apple a day keeps the doctor away.',
        options: ['A', 'An', 'The', 'No article'],
        answer: 'An',
        explanation: 'An apple.'
      },
      {
        text: 'Which is the correct synonym for "Begin"?',
        options: ['End', 'Start', 'Finish', 'Close'],
        answer: 'Start',
        explanation: 'Start is a synonym for begin.'
      },
      {
        text: 'Choose the correct word: She ___ to school every day.',
        options: ['go', 'goes', 'going', 'gone'],
        answer: 'goes',
        explanation: 'She goes to school.'
      },
      {
        text: 'Which is the correct antonym for "Difficult"?',
        options: ['Easy', 'Hard', 'Tough', 'Complex'],
        answer: 'Easy',
        explanation: 'Easy is the opposite of difficult.'
      }
    // ...existing 11 questions...
    ]
    // Add placeholder questions to make 20
    .concat(Array.from({length: 20 - 11}, (_, i) => ({
      text: `English Placeholder Q${i+12}`,
      options: ['A', 'B', 'C', 'D'],
      answer: 'A',
      explanation: `Placeholder explanation for English Q${i+12}`
    })))
  }
];
