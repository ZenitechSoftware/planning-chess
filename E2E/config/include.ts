const pagePath = (route: string) => `../pageObjects/${route}`;
const testDataPath = (route: string) => `../test_data/${route}`;

export = {
  login: pagePath('login.page.ts'),
  game: pagePath('game.page.ts'),
  roles: pagePath('roleSelection.page.ts'),
  username: testDataPath('usernames.ts'),
  chessPiece: testDataPath('chessPieces.ts'),
  chessTile: testDataPath('chessTiles.ts'),
};
