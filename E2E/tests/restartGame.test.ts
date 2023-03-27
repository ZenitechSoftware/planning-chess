Feature("restart game button");

import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieceValue, ChessPiece } from "../test_data/chessPieces";

const { I, login, game } = inject();

Scenario("Board is cleared after clicking restart game button", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(
      ChessPiece.bishop,
      ChessTile.a1,
      ChessPieceValue.bishop
    );
  });
  game.voteAndCheckThatVoteIsVisible(
    ChessPiece.bishop,
    ChessTile.c4,
    ChessPieceValue.bishop
  );
  I.waitForText("Game complete");
  I.click(game.locator.buttons.restartGame);
  game.voteIsNotVisible(
    ChessPiece.bishop,
    ChessTile.c4,
    ChessPieceValue.bishop
  );
  game.voteIsNotVisible(
    ChessPiece.bishop,
    ChessTile.a1,
    ChessPieceValue.bishop
  );
});
