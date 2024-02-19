interface BmiValues {
  value1: number;
  value2: number;
}

export const checkArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  }

  return 'Obese';
};

export const runBmiCalculator = () => {
  try {
    const { value1, value2 } = checkArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
};
