Feature('login');

const { I, login, username, game, roles} = inject();

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

Scenario('User is redirected to game page as spectator by pressing Shift Tab and then Enter', async () => {
  I.amOnPage('/');
  login.login(username.user1);
  roles.pressShiftTabToChangeRole();
  roles.loginByPressingEnter();
  I.seeElement(game.locator.playersList.spectatorIcon);  
});

Scenario('User is redirected to game page as voter by pressing Enter', async () => {
  I.amOnPage('/');
  login.login(username.user1);
  roles.loginByPressingEnter();
  I.seeElement(game.locator.playersList.playerCount(1));
});
export{}