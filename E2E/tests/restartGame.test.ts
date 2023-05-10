Feature("restart game button");

import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieces } from "../test_data/chessPieces";

const { I, login, game } = inject();

Scenario("Board is cleared after clicking restart game button", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, async () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    await game.voteAndCheckThatVoteIsVisible(ChessPieces.bishop, ChessTile.a1);
  });
  await game.voteAndCheckThatVoteIsVisible(ChessPieces.bishop, ChessTile.c4);
  I.seeElement(game.locator.playersList.totalSP);
  I.click(game.locator.buttons.restartGame);
  game.voteIsNotVisible(ChessPieces.bishop, ChessTile.c4);
  game.voteIsNotVisible(ChessPieces.bishop, ChessTile.a1);
});
