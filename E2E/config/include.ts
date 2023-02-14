const pagePath = (route: string) => `../pageObjects/${route}`;
const testDataPath = (route: string) => `../test_data/${route}`;
const assertionsPath = (route: string) => `../assertions/${route}`;

export = {
  login: pagePath('login.page.ts'),
  game: pagePath('game.page.ts'),
  roles: pagePath('roleSelection.page.ts'),
  username: testDataPath('usernames.ts'),
  chessPiece: testDataPath('chessPieces.ts'),
  chessTile: testDataPath('chessTiles.ts'),
  copyLink: assertionsPath('copyLinkAssert.ts')
};
