const pagePath = (route: string) => `../pageObjects/${route}`;
const testDataPath = (route: string) => `../test_data/${route}`;

export = {
  login: pagePath('login.page.ts'),
  game: pagePath('game.page.ts'),
  username: testDataPath('usernames.ts'),

};
