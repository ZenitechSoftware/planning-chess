Feature("game complete");

import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieceValue, ChessPiece } from "../test_data/chessPieces";

const { I, login, game } = inject();

Scenario("Game completes automatically after last voter votes", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(
      ChessPiece.knight,
      ChessTile.e4,
      ChessPieceValue.knight
    );
    I.click(game.locator.chessPieces.chessPiece(ChessPiece.rook));
  });
  game.vote(ChessPiece.pawn, ChessTile.c4);
  I.waitForText("Game complete");
  session(username.user2, () => {
    I.waitForText("Game complete");
    game.voteIsVisible(ChessPiece.pawn, ChessTile.c4, ChessPieceValue.pawn);
    game.voteIsVisible(ChessPiece.knight, ChessTile.e4, ChessPieceValue.knight);
    I.seeElement(
      game.locator.chessPieces.chessPieceHighlighted(ChessPiece.knight)
    );
    I.dontSeeElement(
      game.locator.chessPieces.chessPieceHighlighted(ChessPiece.rook)
    );
  });
});
