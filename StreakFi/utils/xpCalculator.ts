export const calculateXP = (duration: number) => {

  if (duration <= 5) return 5;
  if (duration <= 10) return 10;
  if (duration <= 20) return 20;
  if (duration <= 30) return 30;
  return 50;

};