Feature('game complete');

Before(async ({ I, login, username }) => {
  I.amOnPage('/');
  login.login(username.user1);
});

Scenario('Game completes automatically after last voter votes', async ({ I, login, username, roles, game, chessPiece, chessTile }) => {
    roles.voterLogin();
    I.waitForText('Waiting for more players');
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.loginIntoCreatedGameRoom(url, username.user2);
      roles.voterLogin();
      I.waitForText('Game in progress');
      game.vote(chessPiece.knight, chessTile.e4);
      game.voteIsVisible(chessPiece.knight, chessTile.e4, chessPiece.knightValue);
      I.click(game.locator.chessPieces.figure(chessPiece.rook));
    });
    game.vote(chessPiece.pawn, chessTile.c4);
    I.waitForText('Game complete');
    session(username.user2, () => {
      I.waitForText('Game complete');
      game.voteIsVisible(chessPiece.pawn, chessTile.c4, chessPiece.pawnValue);
      game.voteIsVisible(chessPiece.knight, chessTile.e4, chessPiece.knightValue);
      I.seeElement(game.locator.chessPieces.figureHighlighted(chessPiece.knight));
      I.dontSeeElement(game.locator.chessPieces.figureHighlighted(chessPiece.rook));
    });
  });