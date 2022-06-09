/**
 * Generates and returns random player avatar background and text color
 */
export function getPlayerAvatarColor() {
  const r = Math.floor(Math.random() * 128);
  const g = Math.floor(Math.random() * 128);
  const b = Math.floor(Math.random() * 128);

  return {
    background: {
      r: r + 128,
      g: g + 128,
      b: b + 128
    },
    text: {
      r,
      g,
      b,
    }
  };
}