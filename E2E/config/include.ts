const pagePath = (route: string) => `../pageObjects/${route}`;

export = {
  login: pagePath('login.page.ts'),
};
