Feature("game complete");

import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieces } from "../test_data/chessPieces";

const { I, login, game } = inject();

Scenario("Game completes automatically after last voter votes", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(ChessPieces.knight, ChessTile.e4);
    I.click(game.locator.chessPieces.chessPiece(ChessPieces.rook.name));
  });
  game.vote(ChessPieces.pawn, ChessTile.c4);
  I.seeElement(game.locator.playersList.totalSP);
  session(username.user2, () => {
    I.seeElement(game.locator.playersList.totalSP);
    game.voteIsVisible(ChessPieces.pawn, ChessTile.c4);
    game.voteIsVisible(ChessPieces.knight, ChessTile.e4);
    I.seeElement(
      game.locator.chessPieces.chessPieceHighlighted(ChessPieces.knight.name)
    );
    I.dontSeeElement(
      game.locator.chessPieces.chessPieceHighlighted(ChessPieces.rook.name)
    );
  });
});
