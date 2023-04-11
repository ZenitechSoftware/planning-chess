Feature("Chessboard pop-up is showing moves SP");

const { I, login, game } = inject();
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieces } from "../test_data/chessPieces";

Scenario("Chessboard pop-up shows individual vote information", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  game.voteAndCheckThatVoteIsVisible(ChessPieces.king, ChessTile.f6);
  game.openPopUp(ChessTile.f6);
  game.checkElementsInThePopUp(username.user1);
  const individualScoreInThePopUp = await I.grabNumberFrom(
    game.locator.chessBoardPopUp.score
  );
  const individualScoreInPlayersList = await I.grabTextFrom(
    game.locator.playersList.voterScoreIcon(username.user1)
  );
  I.assertEqual(
    Number(individualScoreInThePopUp),
    Number(individualScoreInPlayersList)
  );
  session(username.user2, () => {
    game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.b3);
    game.voteIsVisible(ChessPieces.king, ChessTile.f6);
    game.openPopUp(ChessTile.f6);
    game.checkElementsInThePopUp(username.user1);
  });
});
