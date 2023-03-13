const pagePath = (route: string) => `../pageObjects/${route}`;

export = {
  login: pagePath('login.page.ts'),
  game: pagePath('game.page.ts'),
  roles: pagePath('roleSelection.page.ts'),
};
