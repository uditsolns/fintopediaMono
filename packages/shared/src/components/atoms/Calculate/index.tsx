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
export const isCoursePurchased = (arr: any[], course_id: number) => {
  const flattenedArray = arr.flat();
  return flattenedArray?.some(
    (item) => item?.course_id === course_id && item?.is_purchased
  );
};

export const filteredCourses = (arr1: any[], arr2: any[]) => {
  let res = arr1?.filter(
    (course) => !arr2.some((enrollment) => enrollment.course_id === course.id)
  );
  return res?.length ? res : [];
};

export const formatDateMonth = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}`;
};

export function formatDateMonthTime(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getUTCDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day} ${month} ${hours}:${minutes}`;
}
export const calculatePercetageAmount = (
  perc: number,
  amount: number
): number => {
  return (amount * perc) / 100;
};


export const calculatePercetage = (perc: number, amount: number): number => {
  return (perc / 100) * amount;
};

export const roundFigure = (amount: number): number => {
  return Math.ceil(amount);
};

export const ENVIRONMENT: string = false ? "PRODUCTION" : "SANDBOX";
export const MERCHANT_ID: string = "PGTESTPAYUAT";

export const SALT_KEY: string = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
export const SALT_INDEX: number = 1;
export const API_ENDPOINT: string = "/pg/v1/pay";

export const PRODUCTION_HOST_URL: string = true
  ? "https://api.phonepe.com/apis/hermes"
  : "https://api-preprod.phonepe.com/apis/pg-sandbox";

export const REDIRECT_URL = "https://aurahealing.in/";
export const CALLBACK_URL = "https://aurahealing.in/";
