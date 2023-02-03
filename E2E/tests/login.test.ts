import usernames = require("../test_data/usernames");

Feature('login');

Before(async ({ I }) => {
  I.amOnPage('/');
});

Scenario('Two users can sign in as voters', async ({ I, login, roles, username }) => {
  login.login(username.user1);
  roles.voterLogin();
  I.waitForText('Waiting for more players');
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.loginIntoCreatedGameRoom(url, usernames.user2);
    roles.voterLogin();
    I.waitForText('Game in progress');
  });
});

Scenario('Two users can have same name', async ({ I, login, game, roles, username }) => {
  login.login(username.user1);
  roles.voterLogin();
  I.see(username.user1, game.locator.playersList.firstUserInList);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.loginIntoCreatedGameRoom(url, usernames.user1);
    roles.voterLogin();
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.see(username.user1, game.locator.playersList.secondUserInList);
  });
});

Scenario('User can’t enter game without name', async ({ I, login }) => {
  login.loginWithoutName();
});

Scenario('User is redirected to the same game room', async ({ I, login, game, roles, username }) => {
  login.login(username.user1);
  roles.voterLogin();
  I.waitForText('Waiting for more players');
  I.amOnPage('/');
  I.waitForText('Waiting for more players');
  I.see(username.user1, game.locator.playersList.firstUserInList);
});
