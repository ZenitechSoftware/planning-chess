Feature("skip other player");
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPiece } from "../test_data/chessPieces";

const { I, login, game } = inject();

Scenario("User skips another player", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    I.click(game.locator.buttons.skipOtherPlayer(username.user1));
    I.waitForElement(
      game.locator.playersList.playerSkippedIcon(username.user1)
    );
  });
  I.waitForElement(game.locator.playersList.playerSkippedBadge(username.user1));
  session(username.user2, () => {
    game.vote(ChessPiece.pawn, ChessTile.a1);
    I.waitForText("Game complete - 1 SP");
  });
});
