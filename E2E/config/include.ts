const pagePath = (route: string) => `../pageObjects/${route}`;
const assertionsPath = (route: string) => `../assertions/${route}`;

export = {
  login: pagePath('login.page.ts'),
  game: pagePath('game.page.ts'),
  roles: pagePath('roleSelection.page.ts'),
  copyLink: assertionsPath('copyLinkAssert.ts')
};
