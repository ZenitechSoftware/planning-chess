Feature("spectator view");
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieces } from "../test_data/chessPieces";

const { I, login, game } = inject();

Scenario("Spectator can’t place selected figure on board", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
    I.click(game.locator.chessPieces.chessPiece(ChessPieces.rook.name));
    I.dontSeeElement(
      game.locator.chessPieces.chessPieceHighlighted(ChessPieces.rook.name)
    );
    I.click(game.locator.chessBoard.chessTile(ChessTile.e4));
    game.voteIsNotVisible(ChessPieces.rook, ChessTile.e2);
  });
});

Scenario("Spectator can’t skip move", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
    I.click(game.locator.buttons.skip);
    I.dontSeeElement(game.locator.buttons.skipButtonHighlighted);
    I.dontSeeElement(
      game.locator.playersList.playerSkippedIcon(username.user3)
    );
  });
});

Scenario("Spectator skips another player", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
    I.click(game.locator.buttons.skipOtherPlayer(username.user1));
    I.waitForElement(
      game.locator.playersList.playerSkippedIcon(username.user1)
    );
  });
  I.waitForElement(game.locator.playersList.playerSkippedBadge(username.user1));
});

Scenario("Spectator doesn’t have to vote for game to be finished", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
  });
  session(username.user2, () => {
    game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
  });
  game.skipMove();
  I.seeElement(game.locator.playersList.totalSP);
  game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
  session(username.user3, () => {
    game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
  });
});

Scenario("Spectator restarts previously finished game", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
  });
  session(username.user2, () => {
    game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
  });
  game.skipMove();
  session(username.user3, () => {
    I.seeElement(game.locator.playersList.totalSP);
    I.click(game.locator.buttons.restartGame);
    game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
  });
  game.voteAndCheckThatVoteIsVisible(ChessPieces.knight, ChessTile.e2);
  session(username.user2, () => {
    game.voteAndCheckThatVoteIsVisible(ChessPieces.king, ChessTile.d3);
    I.seeElement(game.locator.playersList.totalSP);
    game.voteIsVisible(ChessPieces.king, ChessTile.d3);
    game.voteIsVisible(ChessPieces.knight, ChessTile.e2);
    game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
  });
});

Scenario("Spectators are displayed at the bottom of players list", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.spectatorLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user3);
  });
  session(username.user4, () => {
    login.spectatorLoginIntoCreatedGameRoom(url, username.user4);
    I.seeTextEquals(
      `${username.user1}`,
      game.locator.playersList.playerUsernameByIndex(1)
    );
    I.seeTextEquals(
      `${username.user3}`,
      game.locator.playersList.playerUsernameByIndex(2)
    );
    I.seeTextEquals(
      `${username.user4} (you)`,
      game.locator.playersList.playerUsernameByIndex(3)
    );
    I.seeTextEquals(
      `${username.user2}`,
      game.locator.playersList.playerUsernameByIndex(4)
    );
  });
  game.vote(ChessPieces.king, ChessTile.c3);
  session(username.user3, () => {
    game.vote(ChessPieces.king, ChessTile.c3);
    I.seeElement(game.locator.playersList.totalSP);
    I.seeTextEquals(
      `${username.user2}`,
      game.locator.playersList.playerUsernameByIndex(3)
    );
    I.seeTextEquals(
      `${username.user4}`,
      game.locator.playersList.playerUsernameByIndex(4)
    );
  });
});

Scenario("One of the players chooses spectator role", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
    game.spectatorGameInProgressView(username.user3);
    I.refreshPage();
    game.spectatorGameInProgressView(username.user3);
  });
});
