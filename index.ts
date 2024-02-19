import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, hasNaN } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const h = Number(height);
  const w = Number(weight);
  if (isNaN(h) || isNaN(w)) {
    res.status(401).json({
      error: 'malformatted parameters',
    });
  }
  const bmi = calculateBmi(h, w);
  res.status(200).json({
    weigh: w,
    height: h,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({
      error: 'parameters missing',
    });
  }

  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    hasNaN(daily_exercises) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    !isNaN(target)
  ) {
    res.status(400).send({
      error: 'malformatted parameters',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  res.status(200).json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
