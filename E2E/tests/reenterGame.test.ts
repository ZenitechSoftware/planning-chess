Feature('Reenter game')

const { I, login, game } = inject();
import { ChessPiece } from "../test_data/ChessPieces";
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPieceValue } from "../test_data/chessPieces";

Scenario('Player, who was skipped from game by others, leaves and returns back to game room', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  I.click(game.locator.buttons.skipOtherPlayer(username.user2));
  session(username.user2, () => {
    game.navigateBackAndForward();
    game.gameInProgressStatus();
    I.seeElement(game.locator.buttons.skipButtonHighlighted);
  });
  game.vote(ChessPiece.knight, ChessTile.e4);
  I.waitForText('Game complete');
});

Scenario('Player, who was skipped from voting by other player, refreshes browser while game is still in progress', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  I.click(game.locator.buttons.skipOtherPlayer(username.user2));
  session(username.user2, () => {
    I.refreshPage();
    game.gameInProgressStatus();
    I.seeElement(game.locator.buttons.skipButtonHighlighted);
  });
});

Scenario('Player who already skipped the move refreshes browser when game is completed', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  game.vote(ChessPiece.rook, ChessTile.d3);
  session(username.user2, () => {
    game.skipMove();
    I.refreshPage();
    I.seeElement(game.locator.buttons.skipButtonHighlighted);
    I.waitForText('Game complete');
  });
});
  
Scenario('Player leaves and returns back to game room, after game is completed', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
  });
  game.voteAndCheckThatVoteIsVisible(ChessPiece.knight, ChessTile.e4, ChessPieceValue.knight);
  I.waitForText('Game complete');
  const actualFinalScoreBeforeNavigating = Number((await I.grabTextFrom(game.locator.playersList.totalSP)).slice(16, -3));
  game.navigateBackAndForward();
  I.waitForText('Game complete');
  const actualFinalScoreAfterNavigating = Number((await I.grabTextFrom(game.locator.playersList.totalSP)).slice(16, -3));
  I.assertEqual(actualFinalScoreBeforeNavigating, actualFinalScoreAfterNavigating);
});

Scenario('Player refreshes browser when he already finished move', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    I.refreshPage();
    I.waitForText('Game in progress...');
  });
  game.voteIsNotVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
  game.voteAndCheckThatVoteIsVisible(ChessPiece.knight, ChessTile.e4, ChessPieceValue.knight);
  I.waitForText('Game complete');
  game.voteIsVisible(ChessPiece.pawn, ChessTile.c4, ChessPieceValue.pawn);
  game.voteIsVisible(ChessPiece.knight, ChessTile.e4, ChessPieceValue.knight);
});

Scenario('Player leaves and returns back to game room, after he already voted', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, async() => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn)
    const voteScoreBeforeNavigating = Number(await I.grabTextFrom(game.locator.playersList.playerIndividualSP(1)));
    game.navigateBackAndForward();
    I.waitForText('Game in progress...');
    const voteScoreAfterNavigating =  Number(await I.grabTextFrom(game.locator.playersList.playerIndividualSP(1)));
    I.assertEqual(voteScoreBeforeNavigating, voteScoreAfterNavigating);
  });
  game.voteIsNotVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
});

Scenario('Player, who created game room, in browser clicks to go back to previous page', async () => {
  login.firstVoterLogin(username.user1);
  I.waitForElement(game.locator.buttons.copyLink);
  game.navigateBackAndForward();
  I.waitForElement(game.locator.buttons.copyLink);
  I.dontSeeElement(game.locator.chessPieces.container);
});
    