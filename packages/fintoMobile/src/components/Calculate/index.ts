import crashlytics from '@react-native-firebase/crashlytics';

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

export const getRandomItem = <T>(items: T[]): T[] => {
  return [...items].sort(() => Math.random() - 0.5);
};

export const isInCart = (arr: any[], course_id: number) => {
  return arr?.some(item => item?.course_id === course_id);
};

export const filteredCourses = (arr1: any[], arr2: any[]) => {
  let res = arr1?.filter(
    course => !arr2.some(enrollment => enrollment.course_id === course.id),
  );
  return res?.length ? res : [];
};

export const formatDateMonth = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', {month: 'short'});
  return `${day} ${month}`;
};

export function formatDateMonthTime(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getUTCDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getUTCMonth()];
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day} ${month} ${hours}:${minutes}`;
}

export const ENVIRONMENT: string = false ? 'PRODUCTION' : 'SANDBOX';
export const MERCHANT_ID: string = false
  ? 'AURAHEALINGONLINE'
  : 'AURAHONLINEUAT';
export const SALT_KEY: string = false
  ? '8fe7d793-540e-40df-87cf-8118912f40f7'
  : 'c9170f9e-85bc-4055-8cec-812bf1b73f53';
export const SALT_INDEX: number = 1;
export const API_ENDPOINT: string = '/pg/v1/pay';
export const PRODUCTION_HOST_URL: string = false
  ? 'https://api.phonepe.com/apis/hermes'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

export const REDIRECT_URL = 'https://aurahealing.in/';
export const CALLBACK_URL = 'https://aurahealing.in/';

export const getCurrentGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

export async function crashReport(login:any) {
  console.log('crashReport------------------------', login);
  
  try {
    await Promise.all([
      crashlytics().setUserId(`${login?.id ?? ''}`),
      crashlytics().setAttributes({
        Name: `${login?.first_name ?? ''} ${login?.surname_name ?? ''}`,
        Email: `${login?.email ?? ''}`,
        Phone: `${login?.phone ?? ''}`,
      }),
    ]);
    // crashlytics().crash();
  } catch (error) {
    console.log('crashReport------------------------', error);
  }
}
