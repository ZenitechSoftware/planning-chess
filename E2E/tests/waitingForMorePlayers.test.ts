Feature('game status "Waiting for more players"');

import username = require("../test_data/usernames");
const { I, login, game } = inject();

Scenario("Player who enters game first chooses spectator role", () => {
  login.firstSpectatorLogin(username.user1);
  I.see(username.user1, game.locator.playersList.firstUserInList);
  I.seeElement(game.locator.playersList.spectatorIcon);
  I.seeTextEquals(username.user1, game.locator.text.username);
  game.waitingForMorePlayersStatus();
});

Scenario("Player who enters game first chooses voter role", () => {
  login.firstVoterLogin(username.user1);
  I.see(username.user1, game.locator.playersList.firstUserInList);
  I.seeTextEquals(username.user1, game.locator.text.username);
  game.waitingForMorePlayersStatus();
});

Scenario(
  "One voter and other players as spectators can’t play the game",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.spectatorLoginIntoCreatedGameRoom(url, username.user2);
      I.waitForText("Waiting for more players");
    });
    session(username.user3, () => {
      login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
      I.waitForText("Waiting for more players");
    });
  }
);
