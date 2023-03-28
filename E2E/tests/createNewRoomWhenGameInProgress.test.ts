Feature("new room button");

import assertions = require("../assertions/assertions");
import username = require("../test_data/usernames");

const { I, login, game } = inject();

let firstRoomUrl: string;

Before(async () => {
  login.firstVoterLogin(username.user1);
  firstRoomUrl = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(firstRoomUrl, username.user2);
  });
});

Scenario('Voter clicks "New room" when game is in progress', () => {
  session(username.user3, () => {
    login.voterLoginIntoCreatedGameRoom(firstRoomUrl, username.user3);
  });
  game.createNewRoomAndCompareUrl(firstRoomUrl);
  session(username.user2, () => {
    I.waitForElement(game.locator.playersList.playerCount(2));
    assertions.checkIfUrlDidNotChange(firstRoomUrl);
  });
});

Scenario('Spectator clicks "New room" when game is in progress', () => {
  session(username.user3, () => {
    login.spectatorLoginIntoCreatedGameRoom(firstRoomUrl, username.user3);
    game.createNewRoomAndCompareUrl(firstRoomUrl);
  });
  I.waitForElement(game.locator.playersList.playerCount(2));
  assertions.checkIfUrlDidNotChange(firstRoomUrl);
});
