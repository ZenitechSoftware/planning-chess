const { I, game } = inject();
import chessPieces = require("../test_data/chessPieces");

const locator = {
  playersList: {
    firstUserInList: '//*[contains(@data-testid, "0")]/div[@class="team-list-item-name"]',
    secondUserInList: '//*[contains(@data-testid, "1")]/div[@class="team-list-item-name"]',
    spectatorIcon: '//*[@class="team-list-item-avatar spectator-avatar f-center"]//img[@alt="spectator icon"]',
    playerDoneIcon: (username: string) => `//*[contains(@data-testid, '${username}')]/img[@alt='player done icon']`,
    playerSkippedIcon: (username: string) => `//*[contains(@data-testid, '${username}')]/img[@alt='player skipped icon']`,
  },
  text: {
    username: '#username',
    linkCopiedToClipboard: '//*[text() = "Link copied to clipboard"]',
    skipMoveTooltip: '//*[text() = "Mark my move as complete, without any story points"]'
  },
  chessBoard: {
    board: '#chess-board',
    chessTile: (tile: string) => `$chess-tile-${tile}`,
    figureOnBoard: (tile: string, chessPiece: chessPieces.ChessPiece) => `//*[@data-testid='chess-tile-${tile}']//img[@alt='${chessPiece}']`,
    avatarOnBoard: (tile: string) => `//*[@data-testid='chess-tile-${tile}']/div[@class='bubble-container']//span[@class='name']`,
    pointsOnBoard: (tile: string, value: string) => `//*[@data-testid='chess-tile-${tile}']//span[@class='figure-text'][contains(text(), '${value}')]`,
  },
  chessPieces: {
    container: '$chess-pieces-container',
    chessPiece: (chessPiece: chessPieces.ChessPiece) => `$${chessPiece}-piece-btn`,
    figureHighlighted: (chessPiece: chessPieces.ChessPiece) => `//button[@data-testid="${chessPiece}-piece-btn"][contains(@class, "selected")]`,
  },
  buttons: {
    copyLink: locate('//*[text() = "Copy Link"]').at(1),
    restartGame: '//button/span[contains(text(), "Restart game")]',
    skip: '$skip-piece-btn', 
    skipButtonHighlighted: `//button[@data-testid="skip-piece-btn"][contains(@class, "selected")]`,
    skipOtherPlayer: (username: string) =>`//*[contains(@data-testid,'${username}')]//*[@alt='skip other player button icon']`, 
  },
};

export = {
  locator: locator,

  waitingForMorePlayersStatus: () => {
    I.see('Waiting for more players');
    I.seeElement(locator.chessBoard.board);
    I.dontSeeElement(locator.chessPieces.container);
    I.seeElement(locator.buttons.copyLink);
    I.seeElement(locator.buttons.restartGame);
  },

  vote:(chessPiece: chessPieces.ChessPiece, tile: string) => {
    I.click(locator.chessPieces.chessPiece(chessPiece));
    I.waitForVisible(locator.chessPieces.figureHighlighted(chessPiece));
    I.click(locator.chessBoard.chessTile(tile));
  },
  voteIsVisible:(chessPiece: chessPieces.ChessPiece, tile: string, value: string) => {
    I.seeElement(locator.chessBoard.figureOnBoard(tile, chessPiece));
    I.seeElement(locator.chessBoard.avatarOnBoard(tile));
    I.seeElement(locator.chessBoard.pointsOnBoard(tile, value));
  },
  voteIsNotVisible:(chessPiece: chessPieces.ChessPiece, tile: string, value: string) => {
    I.dontSeeElement(locator.chessBoard.figureOnBoard(tile, chessPiece));
    I.dontSeeElement(locator.chessBoard.avatarOnBoard(tile));
    I.dontSeeElement(locator.chessBoard.pointsOnBoard(tile, value));
  },

  checkCopyLinkButton: () => {
    I.waitForElement(locator.buttons.copyLink);
    I.click(locator.buttons.copyLink);
    I.waitForElement(locator.text.linkCopiedToClipboard);
    I.waitForInvisible(locator.text.linkCopiedToClipboard);
    I.click(locator.buttons.copyLink);
    I.waitForElement(locator.text.linkCopiedToClipboard);
  },
  skipMove: () => {
    I.click(locator.buttons.skip);
    I.seeElement(locator.buttons.skipButtonHighlighted);
  },
  voteAndCheckThatVoteIsVisible:(chessPiece: chessPieces.ChessPiece, tile: string, value:string) => {
    game.vote(chessPiece, tile);
    game.voteIsVisible(chessPiece, tile, value);
  },
};