Feature('login');

import username = require("../test_data/usernames");
const { I, login, game } = inject();

Scenario('Two users can sign in as voters', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
});

Scenario('Two users can have same name', async () => {
  login.firstVoterLogin(username.user1);
  I.see(username.user1, game.locator.playersList.firstUserInList);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user1);
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.see(username.user1, game.locator.playersList.secondUserInList);
  });
});

Scenario('User can’t enter game without name', async () => {
  I.amOnPage('/');
  login.loginWithoutName();
});

Scenario('User is redirected to the same game room', async () => {
  login.firstVoterLogin(username.user1);
  I.amOnPage('/');
  I.waitForText('Waiting for more players');
  I.see(username.user1, game.locator.playersList.firstUserInList);
});
