Feature("Reenter game");

const { I, login, game } = inject();
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieces } from "../test_data/chessPieces";

Scenario(
  "Player, who was skipped from game by others, leaves and returns back to game room",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    I.click(game.locator.buttons.skipOtherPlayer(username.user2));
    session(username.user2, () => {
      game.navigateBackAndForward();
      game.gameInProgressStatus();
      I.seeElement(game.locator.buttons.skipButtonHighlighted);
    });
    game.vote(ChessPieces.knight, ChessTile.e4);
    I.seeElement(game.locator.playersList.totalSP);
  }
);

Scenario(
  "Player, who was skipped from voting by other player, refreshes browser while game is still in progress",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    I.click(game.locator.buttons.skipOtherPlayer(username.user2));
    session(username.user2, () => {
      I.refreshPage();
      game.gameInProgressStatus();
      I.seeElement(game.locator.buttons.skipButtonHighlighted);
    });
  }
);

Scenario(
  "Player who already skipped the move refreshes browser when game is completed",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    game.vote(ChessPieces.rook, ChessTile.d3);
    session(username.user2, () => {
      game.skipMove();
      I.refreshPage();
      I.seeElement(game.locator.buttons.skipButtonHighlighted);
      I.seeElement(game.locator.playersList.totalSP);
    });
  }
);

Scenario(
  "Player leaves and returns back to game room, after game is completed",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
    });
    game.voteAndCheckThatVoteIsVisible(ChessPieces.knight, ChessTile.e4);
    I.seeElement(game.locator.playersList.totalSP);
    const actualFinalScoreBeforeNavigating = await I.grabNumberFrom(
      game.locator.playersList.totalSP
    );
    game.navigateBackAndForward();
    I.seeElement(game.locator.playersList.totalSP);
    game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
    game.voteIsVisible(ChessPieces.knight, ChessTile.e4);
    const actualFinalScoreAfterNavigating = await I.grabNumberFrom(
      game.locator.playersList.totalSP
    );
    I.assertEqual(
      Number(actualFinalScoreBeforeNavigating),
      Number(actualFinalScoreAfterNavigating)
    );
  }
);

Scenario("Player refreshes browser when he already finished move", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
    I.refreshPage();
    I.waitForText("Game in progress...");
    game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
  });
  game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
  game.voteAndCheckThatVoteIsVisible(ChessPieces.knight, ChessTile.e4);
  I.seeElement(game.locator.playersList.totalSP);
  game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
  game.voteIsVisible(ChessPieces.knight, ChessTile.e4);
});

Scenario(
  "Player leaves and returns back to game room, after he already voted",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, async () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.voteAndCheckThatVoteIsVisible(ChessPieces.pawn, ChessTile.a1);
      const voteScoreBeforeNavigating = Number(
        await I.grabTextFrom(game.locator.playersList.playerIndividualSP(1))
      );
      game.navigateBackAndForward();
      I.waitForText("Game in progress...");
      game.voteIsVisible(ChessPieces.pawn, ChessTile.a1);
      const voteScoreAfterNavigating = Number(
        await I.grabTextFrom(game.locator.playersList.playerIndividualSP(1))
      );
      I.assertEqual(voteScoreBeforeNavigating, voteScoreAfterNavigating);
    });
    game.voteIsNotVisible(ChessPieces.pawn, ChessTile.a1);
  }
);

Scenario(
  "Player, who created game room, in browser clicks to go back to previous page",
  () => {
    login.firstVoterLogin(username.user1);
    I.waitForElement(game.locator.buttons.copyLink);
    game.navigateBackAndForward();
    I.waitForElement(game.locator.buttons.copyLink);
    I.dontSeeElement(game.locator.chessPieces.container);
  }
);
