"use client";
export const sumCalculate = (arr: any[], priceKey: string) => {
  const sum =
    arr?.length &&
    arr?.reduce((accumulator, currentValue) => {
      const price =
        currentValue[priceKey] ?? currentValue?.course?.[priceKey] ?? 0;

      const numericPrice = Number(price);
      return !isNaN(price) ? accumulator + numericPrice : accumulator;
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

export const getRandomItem = <T,>(items: T[]): T[] => {
  return [...items].sort(() => Math.random() - 0.5);
};

export const isInCart = (arr: any[], course_id: number) => {
  return arr?.some((item) => item?.course_id === course_id);
};

export const filteredCourses = (arr1: any[], arr2: any[]) => {
  let res = arr1?.filter(
    (course) => !arr2.some((enrollment) => enrollment.course_id === course.id)
  );
  return res?.length ? res : [];
};
