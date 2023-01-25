const { I } = inject();

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
  spectatorLogin: (username: string) => {
    I.see('Welcome! Let’s begin.');
    I.waitForVisible(locator.inputs.username, 7);
    I.fillField(locator.inputs.username, username);
    I.click(locator.buttons.login);
    I.waitForVisible(locator.buttons.voter, 7);
    I.waitForVisible(locator.buttons.spectator, 7);
    I.click(locator.buttons.spectator);
  },
  voterLogin: (username: string) => {
    I.see('Welcome! Let’s begin.');
    I.waitForVisible(locator.inputs.username, 7);
    I.fillField(locator.inputs.username, username);
    I.click(locator.buttons.login);
    I.waitForVisible(locator.buttons.voter, 7);
    I.waitForVisible(locator.buttons.spectator, 7);
    I.click(locator.buttons.voter);
  },
  
  loginWithoutName: () => {
    I.see('Welcome! Let’s begin.');
    I.waitForVisible(locator.buttons.disabledLogin, 7);
  },

};
