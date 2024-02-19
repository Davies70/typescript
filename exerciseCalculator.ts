interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

interface ExcerciseValues {
  value1: number;
  value2: number[];
}

export const hasNaN = (array: number[] | []): Boolean => {
  let gotNaN: Boolean = false;
  for (let a of array) {
    if (isNaN(a)) {
      gotNaN = true;
      break;
    }
  }
  return gotNaN;
};

const getArguments = (args: string[]): ExcerciseValues => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const arrayOfHours = process.argv.slice(3).map((h) => Number(h));

  if (!isNaN(Number(args[2])) && !hasNaN(arrayOfHours)) {
    return {
      value1: Number(args[2]),
      value2: arrayOfHours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const getRating = (average: number, target: number): Rating => {
  if (average >= target) {
    return {
      rating: 3,
      ratingDescription: 'very good',
    };
  }
  if (average < target && average >= target / 2) {
    return {
      rating: 2,
      ratingDescription: 'not too bad but could be better',
    };
  } else {
    return {
      rating: 3,
      ratingDescription: 'bad, you need to improve',
    };
  }
};

const getAverage = (
  periodLength: number,
  dailyExerciseHours: number[]
): number => {
  const sum: number = dailyExerciseHours.reduce(
    (previous, current) => previous + current,
    0
  );
  return sum / periodLength;
};

const getTrainingDays = (dailyExerciseHours: number[]): number => {
  let trainingDays: number = 0;
  dailyExerciseHours.forEach((h) => {
    if (h !== 0) {
      trainingDays++;
    }
  });
  return trainingDays;
};

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength: number = dailyExerciseHours.length;

  const trainingDays = getTrainingDays(dailyExerciseHours);
  const average = getAverage(periodLength, dailyExerciseHours);
  const { rating, ratingDescription } = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};


export const runExerciseCalculator = () => {
  try {
    const { value1, value2 } = getArguments(process.argv);
    console.log(calculateExercises(value2, value1));
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
};
