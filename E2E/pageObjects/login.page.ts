const { I, login, roles} = inject();

const locator = {
  buttons: {
    login: '$login-btn',
    voter: '$Voter selection box',
    spectator: '$Spectator selection box',
    disabledLogin: '//button[@data-testid="login-btn"][@disabled]'
  },
  inputs: {
    username: '#username-input',
  },
};

export = {
  locator: locator,
  login: (username: string) => {
    I.see('Welcome! Let’s begin.');
    I.waitForVisible(locator.inputs.username);
    I.fillField(locator.inputs.username, username);
    I.click(locator.buttons.login);
    I.waitForText('Choose your role');
  },
  loginIntoCreatedGameRoom: (url: string, username: string) => {
    I.amOnPage(url);
    I.see('Welcome! Let’s begin.');
    I.waitForVisible(locator.inputs.username);
    I.fillField(locator.inputs.username, username);
    I.click(locator.buttons.login);
    I.waitForText('Choose your role');
  },
  loginWithoutName: () => {
    I.see('Welcome! Let’s begin.');
    I.waitForVisible(locator.buttons.disabledLogin);
  },
  firstVoterLogin: (username: string) => {
    I.amOnPage('/');
    login.login(username);
    roles.voterLogin();
    I.waitForText('Waiting for more players');
  },
  firstSpectatorLogin: (username: string) => {
    I.amOnPage('/');
    login.login(username);
    roles.spectatorLogin();
    I.waitForText('Waiting for more players');
  },
  voterLoginIntoCreatedGameRoom: (url: string, username: string) => {
    login.loginIntoCreatedGameRoom(url, username);
    roles.voterLogin();
    I.waitForText('Game in progress');
  },
  spectatorLoginIntoCreatedGameRoom: (url: string, username: string) => {
    login.loginIntoCreatedGameRoom(url, username);
    roles.spectatorLogin();
  },
};
