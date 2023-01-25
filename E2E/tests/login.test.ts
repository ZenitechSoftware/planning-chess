Feature('login');

Scenario('Two users can sign in as voters', async ({ I, login }) => {
  const user1 = 'name one';
  const user2 = 'second name';
  I.amOnPage('/');
  login.voterLogin(user1);
  I.waitForText('Waiting for more players');
  let url = await I.grabCurrentUrl();
  session(user2, () => {
    I.amOnPage(url);
    login.voterLogin(user2);
    I.waitForText('Game in progress');
  });
});

Scenario('Two users can have same name', async ({ I, login, game }) => {
  const user1 = 'Name';
  const user2 = 'Name';
  I.amOnPage('/');
  login.voterLogin(user1);;
  game.checkFirsNameInList(user1);
  let url = await I.grabCurrentUrl();
  session(user2, () => {
    I.amOnPage(url);
    login.voterLogin(user2);
    game.checkFirsNameInList(user2);
    game.checkSecondNameInList(user1);
  });
});

Scenario('User can’t enter game without name', async ({ I, login }) => {
  I.amOnPage('/');
  login.loginWithoutName();
});

Scenario('User is redirected to the same game room', async ({ I, login, game}) => {
  const user1 = 'Name'
  I.amOnPage('/');
  login.voterLogin(user1);
  I.waitForText('Waiting for more players');
  I.amOnPage('/');
  I.waitForText('Waiting for more players');
  game.checkFirsNameInList(user1);
});
