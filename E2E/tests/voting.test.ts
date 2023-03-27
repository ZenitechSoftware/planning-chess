Feature("voting");

const { I, login, game } = inject();
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieceValue, ChessPiece } from "../test_data/chessPieces";
import { color } from "../test_data/colors";
import assertions = require("../assertions/assertions");

Scenario("Voter can change vote while game is not completed", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(
      ChessPiece.pawn,
      ChessTile.a1,
      ChessPieceValue.pawn
    );
    I.waitForElement(game.locator.playersList.voterScoreIcon(username.user2));
    game.voteAndCheckThatVoteIsVisible(
      ChessPiece.knight,
      ChessTile.e2,
      ChessPieceValue.knight
    );
    game.voteIsNotVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
  });
});

Scenario(
  "Players can’t see each others votes until all of them make a move",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.voteAndCheckThatVoteIsVisible(
        ChessPiece.knight,
        ChessTile.e4,
        ChessPieceValue.knight
      );
    });
    I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2));
    game.voteIsNotVisible(
      ChessPiece.knight,
      ChessTile.e4,
      ChessPieceValue.knight
    );
  }
);

Scenario("Two users with same name vote as separate players", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user1);
    game.voteAndCheckThatVoteIsVisible(
      ChessPiece.knight,
      ChessTile.e4,
      ChessPieceValue.knight
    );
  });
  I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1));
  game.voteIsNotVisible(
    ChessPiece.knight,
    ChessTile.e4,
    ChessPieceValue.knight
  );
  game.vote(ChessPiece.queen, ChessTile.f5);
  I.waitForText("Game complete");
  game.voteIsVisible(ChessPiece.queen, ChessTile.f5, ChessPieceValue.queen);
  game.voteIsVisible(ChessPiece.knight, ChessTile.e4, ChessPieceValue.knight);
  I.see(username.user1, game.locator.playersList.firstUserInList);
  I.see(username.user1, game.locator.playersList.secondUserInList);
  session(username.user2, () => {
    game.voteIsVisible(ChessPiece.queen, ChessTile.f5, ChessPieceValue.queen);
    game.voteIsVisible(ChessPiece.knight, ChessTile.e4, ChessPieceValue.knight);
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
    game.voteAndCheckThatVoteIsVisible(
      ChessPiece.king,
      ChessTile.a1,
      ChessPieceValue.king
    );
    session(username.user2, () => {
      game.voteIsNotVisible(
        ChessPiece.king,
        ChessTile.a1,
        ChessPieceValue.king
      );
      game.voteAndCheckThatVoteIsVisible(
        ChessPiece.bishop,
        ChessTile.b3,
        ChessPieceValue.bishop
      );
    });
    session(username.user3, () => {
      game.voteIsNotVisible(
        ChessPiece.king,
        ChessTile.a1,
        ChessPieceValue.king
      );
      game.voteIsNotVisible(
        ChessPiece.bishop,
        ChessTile.b3,
        ChessPieceValue.bishop
      );
      game.vote(ChessPiece.knight, ChessTile.c3);
      I.waitForText("Game complete");
      game.voteIsVisible(
        ChessPiece.knight,
        ChessTile.c3,
        ChessPieceValue.knight
      );
      game.voteIsVisible(
        ChessPiece.bishop,
        ChessTile.b3,
        ChessPieceValue.bishop
      );
      game.voteIsVisible(ChessPiece.king, ChessTile.a1, ChessPieceValue.king);
    });
    session(username.user2, () => {
      I.waitForText("Game complete");
      game.voteIsVisible(
        ChessPiece.knight,
        ChessTile.c3,
        ChessPieceValue.knight
      );
      game.voteIsVisible(
        ChessPiece.bishop,
        ChessTile.b3,
        ChessPieceValue.bishop
      );
      game.voteIsVisible(ChessPiece.king, ChessTile.a1, ChessPieceValue.king);
    });
    I.waitForText("Game complete");
    game.voteIsVisible(ChessPiece.knight, ChessTile.c3, ChessPieceValue.knight);
    game.voteIsVisible(ChessPiece.bishop, ChessTile.b3, ChessPieceValue.bishop);
    game.voteIsVisible(ChessPiece.king, ChessTile.a1, ChessPieceValue.king);
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
    game.voteAndCheckThatVoteIsVisible(
      ChessPiece.pawn,
      ChessTile.a1,
      ChessPieceValue.pawn
    );
    session(username.user2, () => {
      game.voteIsNotVisible(
        ChessPiece.pawn,
        ChessTile.a1,
        ChessPieceValue.pawn
      );
      game.voteAndCheckThatVoteIsVisible(
        ChessPiece.pawn,
        ChessTile.b3,
        ChessPieceValue.pawn
      );
    });
    session(username.user3, () => {
      game.voteIsNotVisible(
        ChessPiece.pawn,
        ChessTile.a1,
        ChessPieceValue.pawn
      );
      game.voteIsNotVisible(
        ChessPiece.pawn,
        ChessTile.b3,
        ChessPieceValue.pawn
      );
      game.vote(ChessPiece.pawn, ChessTile.c3);
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
      game.voteIsVisible(ChessPiece.pawn, ChessTile.b3, ChessPieceValue.pawn);
      game.voteIsVisible(ChessPiece.pawn, ChessTile.c3, ChessPieceValue.pawn);
    });
    session(username.user2, () => {
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
      game.voteIsVisible(ChessPiece.pawn, ChessTile.b3, ChessPieceValue.pawn);
      game.voteIsVisible(ChessPiece.pawn, ChessTile.c3, ChessPieceValue.pawn);
    });
    I.waitForText("Game complete");
    game.voteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    game.voteIsVisible(ChessPiece.pawn, ChessTile.b3, ChessPieceValue.pawn);
    game.voteIsVisible(ChessPiece.pawn, ChessTile.c3, ChessPieceValue.pawn);
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
    game.voteAndCheckThatVoteIsVisible(
      ChessPiece.pawn,
      ChessTile.a1,
      ChessPieceValue.pawn
    );
    session(username.user2, () => {
      game.voteIsNotVisible(
        ChessPiece.pawn,
        ChessTile.a1,
        ChessPieceValue.pawn
      );
      game.voteAndCheckThatVoteIsVisible(
        ChessPiece.rook,
        ChessTile.a1,
        ChessPieceValue.rook
      );
    });
    session(username.user3, () => {
      game.voteIsNotVisible(
        ChessPiece.pawn,
        ChessTile.a1,
        ChessPieceValue.pawn
      );
      game.voteIsNotVisible(
        ChessPiece.rook,
        ChessTile.a1,
        ChessPieceValue.rook
      );
      game.vote(ChessPiece.king, ChessTile.a1);
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
      I.seeNumberOfElements(
        game.locator.chessBoard.avatarOnBoard(ChessTile.a1),
        3
      );
    });
    session(username.user2, () => {
      I.waitForText("Game complete");
      game.voteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
      I.seeNumberOfElements(
        game.locator.chessBoard.avatarOnBoard(ChessTile.a1),
        3
      );
    });
    I.waitForText("Game complete");
    game.voteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
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
    game.vote(ChessPiece.pawn, ChessTile.a1);
    await assertions.checkIndividualVoteColors(
      username.user1,
      color.transparentGrey,
      color.grey
    );
    const individualSPBeforeGameIsCompleted = await I.grabTextFrom(
      game.locator.playersList.voterScoreIcon(username.user1)
    );
    session(username.user2, () => {
      game.vote(ChessPiece.rook, ChessTile.b3);
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
