Feature('skip move');
import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPiece } from "../test_data/chessPieces";
import { ChessPieceValue } from "../test_data/chessPieces";
import assertions = require("../assertions/assertions")

const { I, login, game } = inject();

Scenario('Player skips move after placing selected figure on board ', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
        game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
        I.waitForElement(game.locator.playersList.voterScoreIcon(username.user2));
        game.skipMove();
        game.voteIsNotVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
        I.seeElement(game.locator.buttons.skipButtonHighlighted);
        I.waitForElement(game.locator.playersList.playerSkippedBadge(username.user2));
    });
});

Scenario('Player who makes the move last skips', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user3);
        game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
    });
    session(username.user2, () => {
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user3))
        game.voteAndCheckThatVoteIsVisible(ChessPiece.rook, ChessTile.b3, ChessPieceValue.rook);
    });
    I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2))
    I.waitForElement(game.locator.playersList.playerDoneIcon(username.user3))
    game.skipMove();
    I.waitForText('Game complete');
});

Scenario('Player who makes the move first skips', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    game.skipMove();
    session(username.user2, () => {
        I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user1))
        game.voteAndCheckThatVoteIsVisible(ChessPiece.rook, ChessTile.b3, ChessPieceValue.rook);
    });
    session(username.user3, () => {
        I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user1))
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2))
        game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
        I.waitForText('Game complete');
    });
});

Scenario('Player, who makes the move between first and last player, skips', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    game.voteAndCheckThatVoteIsVisible(ChessPiece.rook, ChessTile.b3, ChessPieceValue.rook);
    session(username.user2, () => {
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1))
        game.skipMove();
    });
    session(username.user3, () => {
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1))
        I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user2))
        game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.a1, ChessPieceValue.pawn);
        I.waitForText('Game complete');
    });
});

Scenario('All players of the game skip their moves', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user3);
        game.skipMove();
    });
    session(username.user2, () => {
        I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user3))
        game.skipMove();
    });
    I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user2))
    I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user3))
    game.skipMove();
    I.waitForText('Game complete - 0 SP');
});

Scenario('On hover skip move button tooltip appears', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    I.dontSeeElement(game.locator.text.skipMoveTooltip);
    I.moveCursorTo(game.locator.buttons.skip);
    I.waitForVisible(game.locator.text.skipMoveTooltip);
    I.moveCursorTo(game.locator.chessPieces.chessPiece(ChessPiece.bishop));
    I.dontSeeElement(game.locator.text.skipMoveTooltip);
});

Scenario('Skip badge in players list changes its color from grey to orange', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    game.skipMove();
    await assertions.checkSkippedBadgeColorsWhenGameIsInProgress(username.user1);
    session(username.user2,async () => {
        I.seeElement(game.locator.playersList.playerSkippedIcon(username.user1));
        game.vote(ChessPiece.pawn, ChessTile.a1);
        await assertions.checkSkippedBadgeColorsWhenGameIsCompleted(username.user1);
    });
    await assertions.checkSkippedBadgeColorsWhenGameIsCompleted(username.user1);
});
