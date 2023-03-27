const { I, login, roles, game } = inject();

const locator = {
  buttons: {
    login: "$login-btn",
    voter: "$Voter selection box",
    spectator: "$Spectator selection box",
    disabledLogin: "//button[@data-testid='login-btn'][@disabled]",
  },
  inputs: {
    username: "#username-input",
    avatar: "#profile-pic-input",
  },
  text: {
    welcomeLetsBegin: "//*[text() = 'Welcome! Let’s begin.']",
    chooseYourRole: "//*[text() = 'Choose your role']",
  },
};

export = {
  locator: locator,
  login: (username: string) => {
    I.seeElement(locator.text.welcomeLetsBegin);
    I.waitForVisible(locator.inputs.username);
    I.fillField(locator.inputs.username, username);
    I.click(locator.buttons.login);
    I.waitForElement(locator.text.chooseYourRole);
  },
  loginIntoCreatedGameRoom: (url: string, username: string) => {
    I.amOnPage(url);
    I.seeElement(locator.text.welcomeLetsBegin);
    I.waitForVisible(locator.inputs.username);
    I.fillField(locator.inputs.username, username);
    I.click(locator.buttons.login);
    I.waitForElement(locator.text.chooseYourRole);
  },
  loginWithoutName: () => {
    I.seeElement(locator.text.welcomeLetsBegin);
    I.waitForVisible(locator.buttons.disabledLogin);
  },
  firstVoterLogin: (username: string) => {
    I.amOnPage("/");
    login.login(username);
    roles.voterLogin();
    I.waitForElement(game.locator.text.waitingForMorePlayers);
  },
  firstSpectatorLogin: (username: string) => {
    I.amOnPage("/");
    login.login(username);
    roles.spectatorLogin();
    I.waitForElement(game.locator.text.waitingForMorePlayers);
  },
  voterLoginIntoCreatedGameRoom: (url: string, username: string) => {
    login.loginIntoCreatedGameRoom(url, username);
    roles.voterLogin();
    I.waitForText("Game in progress");
  },
  spectatorLoginIntoCreatedGameRoom: (url: string, username: string) => {
    login.loginIntoCreatedGameRoom(url, username);
    roles.spectatorLogin();
  },

  voterUploadAvatarDuringLogin: (username: string, avatarImage: string) => {
    I.amOnPage("/");
    I.seeElement(locator.text.welcomeLetsBegin);
    I.waitForVisible(locator.inputs.username);
    I.fillField(locator.inputs.username, username);
    I.fillField(locator.inputs.avatar, avatarImage);
    I.click(locator.buttons.login);
    I.waitForElement(locator.text.chooseYourRole);
    roles.voterLogin();
    I.waitForElement(game.locator.text.waitingForMorePlayers);
  },

  spectatorUploadAvatarDuringLogin: (username: string, avatarImage: string) => {
    I.amOnPage("/");
    I.seeElement(locator.text.welcomeLetsBegin);
    I.waitForVisible(locator.inputs.username);
    I.fillField(locator.inputs.username, username);
    I.fillField(locator.inputs.avatar, avatarImage);
    I.click(locator.buttons.login);
    I.waitForElement(locator.text.chooseYourRole);
    roles.spectatorLogin();
    I.waitForElement(game.locator.text.waitingForMorePlayers);
  },
};
