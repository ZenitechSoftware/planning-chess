Feature('Player is able to play only in one tab');

import username = require("../test_data/usernames");

const { I, login, game } = inject();

Before(() => {
  I.amOnPage('/');
});

Scenario('Player is not allowed to play in new tab', async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  const playersNumberBeforeDuplication = await game.getNumberOfPlayersInList();
  game.duplicateTab();
  const playersNumberAfterDuplication = await game.getNumberOfPlayersInList();
  I.assertEqual(playersNumberBeforeDuplication, playersNumberAfterDuplication);
});
