export const sumCalculate = (arr: any[], priceKey: string) => {
  const sum =
    arr?.length &&
    arr?.reduce((accumulator, currentValue) => {
      const price = currentValue[priceKey] ? Number(currentValue[priceKey]) : 0;
      return !isNaN(price) ? accumulator + price : accumulator;
    }, 0);

  return sum;
};

export const addTwoNumber = (num1: number, num2: number): number => {
  return num1 + num2;
};

export const subtractTwoNumber = (num1: number, num2: number): number => {
  return num2 - num1;
};

export const multiplyTwoNumber = (num1: number, num2: number): number => {
  return num1 * num2;
};
