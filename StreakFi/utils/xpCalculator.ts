export const calculateXP = (duration: number, multiplier = 1) => {

  let xp = 0;

  if (duration <= 5) xp = 5;
  else if (duration <= 10) xp = 10;
  else if (duration <= 20) xp = 20;
  else if (duration <= 30) xp = 30;
  else xp = 50;

  return xp * multiplier;
};