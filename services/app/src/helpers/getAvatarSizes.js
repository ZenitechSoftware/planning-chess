export const getAvatarPxSize = (size) => {
  if (size === 'x-small') {
    return 26;
  }
  if (size === 'small') {
    return 36;
  }
  if (size === 'large') {
    return 96;
  }

  return 40;
}

export const getAvatarFontSize = (size) => {
  if (size === 'x-small') {
    return '14px';
  }
  if (size === 'small') {
    return '18px';
  }
  if (size === 'large') {
    return '50px';
  }

  return '20px';
}