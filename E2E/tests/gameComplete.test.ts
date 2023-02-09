Feature('game complete');

const { I, login, username, game, chessPiece, chessTile } = inject();

Scenario('Game completes automatically after last voter votes', async () => {
    login.firstVoterLogin(username.user1);
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);  
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
export{}