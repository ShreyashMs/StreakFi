export const getLevel = (xp: number) => {
  return Math.floor(xp / 200) + 1;
};

export const getNextLevelXP = (xp: number) => {

  if (xp < 200) return 200;
  if (xp < 500) return 500;
  if (xp < 900) return 900;
  if (xp < 1400) return 1400;

  return 2000;

};