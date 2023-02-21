const { I, game } = inject();
import { ChessPiece } from "../test_data/ChessPieces";

const locator = {
  playersList: {
    firstUserInList: '//*[contains(@data-testid, "0")]/div[@class="team-list-item-name"]',
    secondUserInList: '//*[contains(@data-testid, "1")]/div[@class="team-list-item-name"]',
    playerUsernameByIndex: (rowNumberInList: number) => locate('//*[@class="team-list-item-name"]').at(rowNumberInList),
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
    figureOnBoard: (tile: string, chessPiece: ChessPiece) => `//*[@data-testid='chess-tile-${tile}']//img[@alt='${chessPiece}']`,
    avatarOnBoard: (tile: string) => `//*[@data-testid='chess-tile-${tile}']/div[@class='bubble-container']//span[@class='name']`,
    pointsOnBoard: (tile: string, value: string) => `//*[@data-testid='chess-tile-${tile}']//span[@class='figure-text'][contains(text(), '${value}')]`,
  },
  chessPieces: {
    container: '#chess-pieces-container',
    chessPiece: (chessPiece: ChessPiece) => `$${chessPiece}-piece-btn`,
    figureHighlighted: (chessPiece: ChessPiece) => `//button[@data-testid="${chessPiece}-piece-btn"][contains(@class, "selected")]`,
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
  gameInProgressStatus: () => {
    I.see('Game in progress');
    I.seeElement(locator.chessBoard.board);
    I.seeElement(locator.chessPieces.container);
    I.seeElement(locator.buttons.copyLink);
    I.seeElement(locator.buttons.restartGame);
  },
  spectatorGameInProgressView: (username:string ) => {
    I.seeTextEquals(`${username} (you)`, game.locator.playersList.playerUsernameByIndex(3));
    I.seeElement(game.locator.playersList.spectatorIcon);
    I.seeTextEquals(`${username}`, game.locator.text.username);
    game.gameInProgressStatus();
  },
  vote:(chessPiece: ChessPiece, tile: string) => {
    I.click(locator.chessPieces.chessPiece(chessPiece));
    I.waitForVisible(locator.chessPieces.figureHighlighted(chessPiece));
    I.click(locator.chessBoard.chessTile(tile));
  },
  voteIsVisible:(chessPiece: ChessPiece, tile: string, value: string) => {
    I.seeElement(locator.chessBoard.figureOnBoard(tile, chessPiece));
    I.seeElement(locator.chessBoard.avatarOnBoard(tile));
    I.seeElement(locator.chessBoard.pointsOnBoard(tile, value));
  },
  voteIsNotVisible:(chessPiece: ChessPiece, tile: string, value: string) => {
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
  voteAndCheckThatVoteIsVisible:(chessPiece: ChessPiece, tile: string, value:string) => {
    game.vote(chessPiece, tile);
    game.voteIsVisible(chessPiece, tile, value);
  },
};