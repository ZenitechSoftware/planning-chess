Feature('voting');
const { I, login, username, game, chessPiece, chessTile } = inject();

Scenario('Voter can change vote while game is not completed', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
    game.vote(chessPiece.pawn, chessTile.a1);
    game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2));
    game.vote(chessPiece.knight, chessTile.e2);
    game.voteIsNotVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    game.voteIsVisible(chessPiece.knight, chessTile.e2, chessPiece.knightValue);
  });
});

Scenario('Players can’t see each others votes until all of them make a move', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2)
    game.vote(chessPiece.knight, chessTile.e4);
    game.voteIsVisible(chessPiece.knight, chessTile.e4, chessPiece.knightValue);
  });
  I.waitForElement(game.locator.playersList.playerDoneIcon(username.user2));
  game.voteIsNotVisible(chessPiece.knight, chessTile.e4, chessPiece.knightValue);
});

Scenario('Two users with same name vote as separate players', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user1)
    game.vote(chessPiece.knight, chessTile.e4);
    game.voteIsVisible(chessPiece.knight, chessTile.e4, chessPiece.knightValue);
  });
  I.waitForElement(game.locator.playersList.playerDoneIcon(username.user1));
  game.voteIsNotVisible(chessPiece.knight, chessTile.e4, chessPiece.knightValue);
  game.vote(chessPiece.queen, chessTile.f5);
  I.waitForText('Game complete');
  game.voteIsVisible(chessPiece.queen, chessTile.f5, chessPiece.queenValue);
  game.voteIsVisible(chessPiece.knight, chessTile.e4, chessPiece.knightValue);
  I.see(username.user1, game.locator.playersList.firstUserInList);
  I.see(username.user1, game.locator.playersList.secondUserInList);
  session(username.user2, () => {
    game.voteIsVisible(chessPiece.queen, chessTile.f5, chessPiece.queenValue);
    game.voteIsVisible(chessPiece.knight, chessTile.e4, chessPiece.knightValue);
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.see(username.user1, game.locator.playersList.secondUserInList);
  });
});

Scenario('3 players place different figures on different board squares', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2)
  });
  session(username.user3, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user3)
  });
  game.vote(chessPiece.king, chessTile.a1);
  game.voteIsVisible(chessPiece.king, chessTile.a1, chessPiece.kingValue);
  session(username.user2, () => {
    game.voteIsNotVisible(chessPiece.king, chessTile.a1, chessPiece.kingValue);
    game.vote(chessPiece.bishop, chessTile.b3);
    game.voteIsVisible(chessPiece.bishop, chessTile.b3, chessPiece.bishopValue);
  });
  session(username.user3, () => {
    game.voteIsNotVisible(chessPiece.king, chessTile.a1, chessPiece.kingValue);
    game.voteIsNotVisible(chessPiece.bishop, chessTile.b3, chessPiece.bishopValue);
    game.vote(chessPiece.knight, chessTile.c3);
    I.waitForText('Game complete');
    game.voteIsVisible(chessPiece.knight, chessTile.c3, chessPiece.knightValue);
    game.voteIsVisible(chessPiece.bishop, chessTile.b3, chessPiece.bishopValue);
    game.voteIsVisible(chessPiece.king, chessTile.a1, chessPiece.kingValue);
  });
  session(username.user2, () => {
    I.waitForText('Game complete');
    game.voteIsVisible(chessPiece.knight, chessTile.c3, chessPiece.knightValue);
    game.voteIsVisible(chessPiece.bishop, chessTile.b3, chessPiece.bishopValue);
    game.voteIsVisible(chessPiece.king, chessTile.a1, chessPiece.kingValue);
  });
  I.waitForText('Game complete');
  game.voteIsVisible(chessPiece.knight, chessTile.c3, chessPiece.knightValue);
  game.voteIsVisible(chessPiece.bishop, chessTile.b3, chessPiece.bishopValue);
  game.voteIsVisible(chessPiece.king, chessTile.a1, chessPiece.kingValue);
});

Scenario('3 players choose same figure and place on different board squares', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2)
  });
  session(username.user3, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user3)
  });
  game.vote(chessPiece.pawn, chessTile.a1);
  game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
  session(username.user2, () => {
    game.voteIsNotVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawn);
    game.vote(chessPiece.pawn, chessTile.b3);
    game.voteIsVisible(chessPiece.pawn, chessTile.b3, chessPiece.pawnValue);
  });
  session(username.user3, () => {
    game.voteIsNotVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    game.voteIsNotVisible(chessPiece.pawn, chessTile.b3, chessPiece.pawnValue);
    game.vote(chessPiece.pawn, chessTile.c3);
    I.waitForText('Game complete');
    game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    game.voteIsVisible(chessPiece.pawn, chessTile.b3, chessPiece.pawnValue);
    game.voteIsVisible(chessPiece.pawn, chessTile.c3, chessPiece.pawnValue);
  });
  session(username.user2, () => {
    I.waitForText('Game complete');
    game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    game.voteIsVisible(chessPiece.pawn, chessTile.b3, chessPiece.pawnValue);
    game.voteIsVisible(chessPiece.pawn, chessTile.c3, chessPiece.pawnValue);
  });
  I.waitForText('Game complete');
  game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
  game.voteIsVisible(chessPiece.pawn, chessTile.b3, chessPiece.pawnValue);
  game.voteIsVisible(chessPiece.pawn, chessTile.c3, chessPiece.pawnValue);
});

Scenario('3 players choose different figure and place on same board square', async () => {
  login.firstVoterLogin(username.user1);
  let url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2)
  });
  session(username.user3, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user3)
  });
  game.vote(chessPiece.pawn, chessTile.a1);
  game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
  session(username.user2, () => {
    game.voteIsNotVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    game.vote(chessPiece.rook, chessTile.a1);
    game.voteIsVisible(chessPiece.rook, chessTile.a1, chessPiece.rookValue);
  });
  session(username.user3, () => {
    game.voteIsNotVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    game.voteIsNotVisible(chessPiece.rook, chessTile.a1, chessPiece.rookValue);
    game.vote(chessPiece.king, chessTile.a1);
    I.waitForText('Game complete');
    game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    I.seeNumberOfElements(game.locator.chessBoard.avatarOnBoard(chessTile.a1), 3);
  });
  session(username.user2, () => {
    I.waitForText('Game complete');
    game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
    I.seeNumberOfElements(game.locator.chessBoard.avatarOnBoard(chessTile.a1), 3);
  });
  I.waitForText('Game complete');
  game.voteIsVisible(chessPiece.pawn, chessTile.a1, chessPiece.pawnValue);
  I.seeNumberOfElements(game.locator.chessBoard.avatarOnBoard(chessTile.a1), 3);
});

export{}