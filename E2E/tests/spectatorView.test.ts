Feature('spectator view');
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPiece } from "../test_data/chessPieces";
import { ChessPieceValue } from "../test_data/chessPieces";

const { I, login, game } = inject();

Scenario('Spectator can’t place selected figure on board', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
        I.click(game.locator.chessPieces.chessPiece(ChessPiece.rook));
        I.dontSeeElement(game.locator.chessPieces.chessPieceHighlighted(ChessPiece.rook));
        I.click(game.locator.chessBoard.chessTile(ChessTile.e4));
        game.voteIsNotVisible(ChessPiece.rook, ChessTile.e2, ChessPieceValue.rook)
    });
});

Scenario('Spectator can’t skip move', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
        I.click(game.locator.buttons.skip);
        I.dontSeeElement(game.locator.buttons.skipButtonHighlighted);
        I.dontSeeElement(game.locator.playersList.playerSkippedIcon(username.user3));
    });
});

Scenario('Spectator skips another player', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
        I.click(game.locator.buttons.skipOtherPlayer(username.user1))
        I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user1));
    });
    I.waitForElement(game.locator.playersList.playerSkippedBadge(username.user1));
});

Scenario('Spectator doesn’t have to vote for game to be finished', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
    });
    session(username.user2, () => {
        game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    })
    game.skipMove();
    I.waitForText('Game complete');
    game.voteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    session(username.user3, () => {
        game.voteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    });
});

Scenario('Spectator restarts previously finished game', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.spectatorLoginIntoCreatedGameRoom(url, username.user3);
    });
    session(username.user2, () => {
        game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    })
    game.skipMove();
    session(username.user3, () => {
        I.waitForText('Game complete');
        I.click(game.locator.buttons.restartGame);
        game.voteIsNotVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    });
    game.voteAndCheckThatVoteIsVisible(ChessPiece.knight, ChessTile.e2, ChessPieceValue.knight);
    session(username.user2, () => {
        game.voteAndCheckThatVoteIsVisible(ChessPiece.king, ChessTile.d3, ChessPieceValue.king);
        I.waitForText('Game complete');
        game.voteIsVisible(ChessPiece.king, ChessTile.d3, ChessPieceValue.king);
        game.voteIsVisible(ChessPiece.knight, ChessTile.e2, ChessPieceValue.knight);
        game.voteIsNotVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    })
});

Scenario('Spectators are displayed at the bottom of players list', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.spectatorLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    session(username.user4, () => {
        login.spectatorLoginIntoCreatedGameRoom(url, username.user4);
        I.seeTextEquals(`${username.user1}`, game.locator.playersList.playerUsernameByIndex(1));
        I.seeTextEquals(`${username.user3}`, game.locator.playersList.playerUsernameByIndex(2));
        I.seeTextEquals(`${username.user4} (you)`, game.locator.playersList.playerUsernameByIndex(3));
        I.seeTextEquals(`${username.user2}`, game.locator.playersList.playerUsernameByIndex(4));
    });
    game.vote(ChessPiece.king, ChessTile.c3);
    session(username.user3, () => {
        game.vote(ChessPiece.king, ChessTile.c3);
        I.waitForText('Game complete');
        I.seeTextEquals(`${username.user2}`, game.locator.playersList.playerUsernameByIndex(3));
        I.seeTextEquals(`${username.user4}`, game.locator.playersList.playerUsernameByIndex(4));
    });
});

Scenario('One of the players chooses spectator role', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
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