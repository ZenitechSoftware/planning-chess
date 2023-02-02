Feature('Copy link');

const { I, login, username, game } = inject();

Before(() => {
  I.amOnPage('/');
});

Scenario('Player can copy a game link',() => {
  login.voterLogin(username.user1);
  game.checkCopyLinkButton();
});

Scenario('Spectator can copy a game link',() => {
    login.spectatorLogin(username.user2);
    game.checkCopyLinkButton();
});
