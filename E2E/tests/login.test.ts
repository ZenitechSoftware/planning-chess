Feature('login');

Scenario('LOGIN', async ({ I, login }) => {
  const user1 = 'name one';
  const user2 = 'second name';
  I.amOnPage('/');

  login.login(user1);

  I.waitForText('Waiting for more players');

  let url = await I.grabCurrentUrl();

  session(user2, () => {
    I.amOnPage(url);

    login.login(user2);
    I.waitForText('Game in progress');
  });
});
