Feature('SP counting')

const { I, login, game } = inject();
import username = require("../test_data/usernames");
import { ChessPiece, ChessPieceValue} from "../test_data/chessPieces";
import { ChessBoardNumbersValue, ChessBoardLettersValue } from "../test_data/chessBoardGridValues";
import ChessTile = require("../test_data/chessTiles");
import assertions = require("../assertions/assertions");

Scenario('Individual final SP is rounded to closest value', async () => { 
  login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.vote(ChessPiece.queen, ChessTile.f5);
    });
    game.vote(ChessPiece.bishop, ChessTile.d3);
    const expectedFirstPlayerScore = game.expectedPlayerScore(ChessPieceValue.bishop, ChessBoardLettersValue.d, ChessBoardNumbersValue[3]);
    const actualFirstPlayerSP = await game.getActualPlayerScore(username.user1);
    await I.assertEqual(actualFirstPlayerSP, expectedFirstPlayerScore);
    const expectedSecondPlayerScore = game.expectedPlayerScore(ChessPieceValue.queen, ChessBoardLettersValue.f, ChessBoardNumbersValue[5]);
    const actualSecondPlayerSP = await game.getActualPlayerScore(username.user2);
    await I.assertEqual(actualSecondPlayerSP, expectedSecondPlayerScore);
});

Scenario('Final SP is rounded to closest value when closest value is boundary value', async () => {
  login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.vote(ChessPiece.queen, ChessTile.f5);
    });
    game.vote(ChessPiece.pawn, ChessTile.b3);
    await assertions.checkIfTheFinalSPIsRoundedCorrectly(2);
});

Scenario('Players who skipped are not included in final score counting', async () => {
  login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.skipMove();
    });
    game.vote(ChessPiece.bishop, ChessTile.d3);
    await assertions.checkTheTotalSPAfterOneOfThePlayersSkippedTheMove();
});

Scenario('Final SP is rounded to closest value when closest value is lower value', async () => {
  login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.vote(ChessPiece.rook, ChessTile.d4);
    });
    game.vote(ChessPiece.bishop, ChessTile.a3);
    await assertions.checkIfTheFinalSPIsRoundedCorrectly(2);
});

Scenario('Final SP is rounded to closest value when closest value is higher value', async () => {
  login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.vote(ChessPiece.king, ChessTile.f6);
    });
    game.vote(ChessPiece.pawn, ChessTile.b3);
    await assertions.checkIfTheFinalSPIsRoundedCorrectly(2);
});

Scenario('Last player to vote leaves the game and the final SP is calculated of the two remaining players', async () => {
  login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
      game.vote(ChessPiece.king, ChessTile.f6);
    });
    session(username.user3, () => {
      I.openNewTab();
      login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    game.vote(ChessPiece.pawn, ChessTile.b3);
    session(username.user3, () => {
      I.switchToNextTab();
      I.closeCurrentTab();
    });
    await assertions.checkIfTheFinalSPIsRoundedCorrectly(2);
});

Scenario('Spectators are not included in final score counting', async () => {
  login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.spectatorLoginIntoCreatedGameRoom(url, username.user2);   
    });
    session(username.user3, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user3);
      game.vote(ChessPiece.king, ChessTile.f6);
    });
    game.vote(ChessPiece.pawn, ChessTile.b3);
    await assertions.checkIfTheFinalSPIsRoundedCorrectly(2);
});
