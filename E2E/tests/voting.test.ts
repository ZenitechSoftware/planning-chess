Feature("voting");

const { I, login, game } = inject();
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieces } from "../test_data/chessPieces";
import { color } from "../test_data/colors";
import assertions = require("../assertions/assertions");

Scenario("Voter can change vote while game is not completed", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
    I.waitForElement(game.locator.playersList.voterScoreIcon(username.user2));
    game.voteAndCheckThatVoteIsVisible(ChessPieces.knight, ChessTile.e2);
    game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
  });
});

Scenario(
  "Players can’t see each others votes until all of them make a move",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.voteAndCheckThatVoteIsVisible(ChessPieces.knight, ChessTile.e4);
    });
    I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2));
    game.voteIsNotVisible(ChessPieces.knight, ChessTile.e4);
  }
);

Scenario("Two users with same name vote as separate players", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user1);
    game.voteAndCheckThatVoteIsVisible(ChessPieces.knight, ChessTile.e4);
  });
  I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1));
  game.voteIsNotVisible(ChessPieces.knight, ChessTile.e4);
  game.vote(ChessPieces.queen, ChessTile.f5);
  I.waitForText("Game complete");
  game.voteIsVisible(ChessPieces.queen, ChessTile.f5);
  game.voteIsVisible(ChessPieces.knight, ChessTile.e4);
  I.see(username.user1, game.locator.playersList.firstUserInList);
  I.see(username.user1, game.locator.playersList.secondUserInList);
  session(username.user2, () => {
    game.voteIsVisible(ChessPieces.queen, ChessTile.f5);
    game.voteIsVisible(ChessPieces.knight, ChessTile.e4);
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.see(username.user1, game.locator.playersList.secondUserInList);
  });
});

Scenario(
  "3 players place different figures on different board squares",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    game.voteAndCheckThatVoteIsVisible(ChessPieces.king, ChessTile.a1);
    session(username.user2, () => {
      game.voteIsNotVisible(ChessPieces.king, ChessTile.a1);
      game.voteAndCheckThatVoteIsVisible(ChessPieces.bishop, ChessTile.b3);
    });
    session(username.user3, () => {
      game.voteIsNotVisible(ChessPieces.king, ChessTile.a1);
      game.voteIsNotVisible(ChessPieces.bishop, ChessTile.b3);
      game.vote(ChessPieces.knight, ChessTile.c3);
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPieces.knight, ChessTile.c3);
      game.voteIsVisible(ChessPieces.bishop, ChessTile.b3);
      game.voteIsVisible(ChessPieces.king, ChessTile.a1);
    });
    session(username.user2, () => {
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPieces.knight, ChessTile.c3);
      game.voteIsVisible(ChessPieces.bishop, ChessTile.b3);
      game.voteIsVisible(ChessPieces.king, ChessTile.a1);
    });
    I.waitForText("Game complete");
    game.voteIsVisible(ChessPieces.knight, ChessTile.c3);
    game.voteIsVisible(ChessPieces.bishop, ChessTile.b3);
    game.voteIsVisible(ChessPieces.king, ChessTile.a1);
  }
);

Scenario(
  "3 players choose same figure and place on different board squares",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
    session(username.user2, () => {
      game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
      game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.b3);
    });
    session(username.user3, () => {
      game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
      game.voteIsNotVisible(ChessPieces.pawn, ChessTile.b3);
      game.vote(ChessPieces.pawn, ChessTile.c3);
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
      game.voteIsVisible(ChessPieces.pawn, ChessTile.b3);
      game.voteIsVisible(ChessPieces.pawn, ChessTile.c3);
    });
    session(username.user2, () => {
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
      game.voteIsVisible(ChessPieces.pawn, ChessTile.b3);
      game.voteIsVisible(ChessPieces.pawn, ChessTile.c3);
    });
    I.waitForText("Game complete");
    game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
    game.voteIsVisible(ChessPieces.pawn, ChessTile.b3);
    game.voteIsVisible(ChessPieces.pawn, ChessTile.c3);
  }
);

Scenario(
  "3 players choose different figure and place on same board square",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
    session(username.user2, () => {
      game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
      game.voteAndCheckThatVoteIsVisible(ChessPieces.rook, ChessTile.a1);
    });
    session(username.user3, () => {
      game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
      game.voteIsNotVisible(ChessPieces.rook, ChessTile.a1);
      game.vote(ChessPieces.king, ChessTile.a1);
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPieces.king, ChessTile.a1);
      I.seeNumberOfElements(
        game.locator.chessBoard.avatarOnBoard(ChessTile.a1),
        3
      );
    });
    session(username.user2, () => {
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPieces.rook, ChessTile.a1);
      I.seeNumberOfElements(
        game.locator.chessBoard.avatarOnBoard(ChessTile.a1),
        3
      );
    });
    I.waitForText("Game complete");
    game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
    I.seeNumberOfElements(
      game.locator.chessBoard.avatarOnBoard(ChessTile.a1),
      3
    );
  }
);

Scenario(
  "Individual vote in players list changes its color from grey to green",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    game.vote(ChessPieces.pawn, ChessTile.a1);
    await assertions.checkIndividualVoteColors(
      username.user1,
      color.transparentGrey,
      color.grey
    );
    const individualSPBeforeGameIsCompleted = await I.grabTextFrom(
      game.locator.playersList.voterScoreIcon(username.user1)
    );
    session(username.user2, () => {
      game.vote(ChessPieces.rook, ChessTile.b3);
    });
    I.waitForText("Game complete");
    await assertions.checkIndividualVoteColors(
      username.user1,
      color.green,
      color.white
    );
    const individualSPWhenGameIsCompleted = await I.grabTextFrom(
      game.locator.playersList.voterScoreIcon(username.user1)
    );
    I.assertEqual(
      individualSPBeforeGameIsCompleted,
      individualSPWhenGameIsCompleted
    );
  }
);
