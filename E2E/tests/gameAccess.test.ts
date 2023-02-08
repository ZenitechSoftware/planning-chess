Feature('Player is able to play only in one tab');

const { I, login, username, game } = inject();
import copyLinkAssert = require("../assertions/copyLinkAssert");

Before(() => {
  I.amOnPage('/');
});

Scenario('Player is not allowed to play in new tab', async () => {
  login.voterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    I.amOnPage(url);
    login.voterLogin(username.user2);
    I.waitForText('Game in progress');
  });
  const totalPlayersNumber = await game.getPlayersList();
  game.playerCannotAccessTheBoardFromNewTab();
  await copyLinkAssert.checkIfTheNumberOfPlayersRemainsTheSame(totalPlayersNumber);
  session(username.user2, async() => {
    await copyLinkAssert.checkIfTheNumberOfPlayersRemainsTheSame(totalPlayersNumber);
  });
});
