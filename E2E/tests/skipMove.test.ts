Feature('skip move');
import username = require("../test_data/usernames");
import chessPieces = require("../test_data/ChessPieces");
import chessTile = require("../test_data/ChessTiles");

const { I, login, game } = inject();

Scenario('Player skips move after placing selected figure on board ', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.voterLoginIntoCreatedGameRoom(url, username.user2);
        game.voteAndCheckThatVoteIsVisible(chessPieces.ChessPiece.pawn, chessTile.a1, chessPieces.ChessPieceValue.pawn);
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2));
        game.skipMove();
        game.voteIsNotVisible(chessPieces.ChessPiece.pawn, chessTile.a1, chessPieces.ChessPieceValue.pawn);
        I.seeElement(game.locator.buttons.skipButtonHighlighted);
        I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user2));
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
        game.voteAndCheckThatVoteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    });
    session(username.user2, () => {
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user3))
        game.voteAndCheckThatVoteIsVisible(chessPiece.rook, chessTile.b3, chessPiece.rookValue);
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
        game.voteAndCheckThatVoteIsVisible(chessPiece.rook, chessTile.b3, chessPiece.rookValue );
    });
    session(username.user3, () => {
        I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user1))
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2))
        game.voteAndCheckThatVoteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
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
    game.voteAndCheckThatVoteIsVisible(chessPiece.rook, chessTile.b3, chessPiece.rookValue);
    session(username.user2, () => {
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1))
        game.skipMove();
    });
    session(username.user3, () => {
        I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1))
        I.waitForElement(game.locator.playersList.playerSkippedIcon(username.user2))
        game.voteAndCheckThatVoteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
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
    I.moveCursorTo(game.locator.chessPieces.figure(chessPiece.bishop));
    I.dontSeeElement(game.locator.text.skipMoveTooltip);
});
