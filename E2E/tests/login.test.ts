Feature('login');

Before(async ({ I }) => {
  I.amOnPage('/');
});

Scenario('Two users can sign in as voters', async ({ I, login, username }) => {
  login.voterLogin(username.user1);
  I.waitForText('Waiting for more players');
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    I.amOnPage(url);
    login.voterLogin(username.user2);
    I.waitForText('Game in progress');
  });
});

Scenario('Two users can have same name', async ({ I, login, game, username }) => {
  login.voterLogin(username.user1);
  I.see(username.user1, game.locator.playersList.firstUserInList);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    I.amOnPage(url);
    login.voterLogin(username.user1);
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.see(username.user1, game.locator.playersList.secondUserInList);
  });
});

Scenario('User can’t enter game without name', async ({ I, login }) => {
  login.loginWithoutName();
});

Scenario('User is redirected to the same game room', async ({ I, login, game, username }) => {
  login.voterLogin(username.user1);
  I.waitForText('Waiting for more players');
  I.amOnPage('/');
  I.waitForText('Waiting for more players');
  I.see(username.user1, game.locator.playersList.firstUserInList);
});
