export const getAvatarPxSize = (size) => {
  if (size === 'x-small') {
    return 24;
  }
  if (size === 'small') {
    return 34;
  }
  if (size === 'large') {
    return 90;
  }

  return 40;
}