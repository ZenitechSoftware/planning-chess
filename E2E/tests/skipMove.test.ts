Feature("skip move");

const { I, login, game } = inject();
import assertions = require("../assertions/assertions");
import { color } from "../test_data/colors";
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieces } from "../test_data/chessPieces";

Scenario(
  "Player skips move after placing selected figure on board",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, async () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      await game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
      I.waitForElement(game.locator.playersList.voterScoreIcon(username.user2));
      game.skipMove();
      game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
      I.seeElement(game.locator.buttons.skipButtonHighlighted);
      I.waitForElement(
        game.locator.playersList.playerSkippedBadge(username.user2)
      );
    });
  }
);

Scenario("Player who makes the move last skips", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, async () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user3);
    await game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
  });
  session(username.user2, async () => {
    I.waitForElement(game.locator.playersList.playerDoneIcon(username.user3));
    await game.voteAndCheckThatVoteIsVisible(ChessPieces.rook, ChessTile.b3);
  });
  I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2));
  I.waitForElement(game.locator.playersList.playerDoneIcon(username.user3));
  game.skipMove();
  I.seeElement(game.locator.playersList.totalSP);
});

Scenario("Player who makes the move first skips", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user3);
  });
  game.skipMove();
  session(username.user2, async () => {
    I.waitForElement(
      game.locator.playersList.playerSkippedIcon(username.user1)
    );
    await game.voteAndCheckThatVoteIsVisible(ChessPieces.rook, ChessTile.b3);
  });
  session(username.user3, async () => {
    I.waitForElement(
      game.locator.playersList.playerSkippedIcon(username.user1)
    );
    I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2));
    await game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
    I.seeElement(game.locator.playersList.totalSP);
  });
});

Scenario(
  "Player, who makes the move between first and last player, skips",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    await game.voteAndCheckThatVoteIsVisible(ChessPieces.rook, ChessTile.b3);
    session(username.user2, () => {
      I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1));
      game.skipMove();
    });
    session(username.user3, async () => {
      I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1));
      I.waitForElement(
        game.locator.playersList.playerSkippedIcon(username.user2)
      );
      await game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
      I.seeElement(game.locator.playersList.totalSP);
    });
  }
);

Scenario("All players of the game skip their moves", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user3);
    game.skipMove();
  });
  session(username.user2, () => {
    I.waitForElement(
      game.locator.playersList.playerSkippedIcon(username.user3)
    );
    game.skipMove();
  });
  I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user2));
  I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user3));
  game.skipMove();
  I.waitForText("Game complete - 0 SP");
});

Scenario("On hover skip move button tooltip appears", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  I.dontSeeElement(game.locator.text.skipMoveTooltip);
  I.moveCursorTo(game.locator.buttons.skip);
  I.waitForVisible(game.locator.text.skipMoveTooltip);
  I.moveCursorTo(game.locator.chessPieces.chessPiece(ChessPieces.bishop.name));
  I.dontSeeElement(game.locator.text.skipMoveTooltip);
});

Scenario(
  "Skip badge in players list changes its color from grey to orange",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    game.skipMove();
    await assertions.checkSkippedBadgeColors(
      username.user1,
      color.transparentGrey,
      color.grey
    );
    session(username.user2, async () => {
      I.seeElement(game.locator.playersList.playerSkippedIcon(username.user1));
      game.vote(ChessPieces.pawn, ChessTile.a1);
      await assertions.checkSkippedBadgeColors(
        username.user1,
        color.orange,
        color.white
      );
    });
    await assertions.checkSkippedBadgeColors(
      username.user1,
      color.orange,
      color.white
    );
  }
);
