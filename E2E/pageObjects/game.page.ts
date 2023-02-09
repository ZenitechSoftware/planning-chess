const { I } = inject();

const locator = {
  playersList: {
    firstUserInList: '//*[contains(@data-testid, "0")]/div[@class="team-list-item-name"]',
    secondUserInList: '//*[contains(@data-testid, "1")]/div[@class="team-list-item-name"]',
    spectatorIcon: '//*[@class="team-list-item-avatar spectator-avatar f-center"]//img[@alt="spectator icon"]',
    playerDoneIcon: (username: string) => `//*[contains(@data-testid, '${username}')]/img[@alt='player done icon']`,
  },
  text: {
    username: '#username',
    linkCopiedToClipboard: '//*[text() = "Link copied to clipboard"]',
  },
  chessBoard: {
    board: '#chess-board',
    chessTile: (tile: string) => `$chess-tile-${tile}`,
    figureOnBoard: (tile: string, figure: string) => `//*[@data-testid='chess-tile-${tile}']//img[@alt='${figure}']`,
    avatarOnBoard: (tile: string) => `//*[@data-testid='chess-tile-${tile}']/div[@class='bubble-container']//span[@class='name']`,
    pointsOnBoard: (tile: string, value: string) => `//*[@data-testid='chess-tile-${tile}']//span[@class='figure-text'][contains(text(), '${value}')]`,
  },
  chessPieces: {
    container: '$chess-pieces-container',
    figure: (figure: string) => `$${figure}-piece-btn`,
    figureHighlighted: (figure: string) => `//button[@data-testid="${figure}-piece-btn"][contains(@class, "selected")]`,
  },
  buttons: {
    copyLink: locate('//*[text() = "Copy Link"]').at(1),
    restartGame: '//button/span[contains(text(), "Restart game")]',
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
  vote:(figure: string, tile: string) => {
    I.click(locator.chessPieces.figure(figure));
    I.waitForVisible(locator.chessPieces.figureHighlighted(figure));
    I.click(locator.chessBoard.chessTile(tile));
  },
  voteIsVisible:(figure: string, tile: string, value: string) => {
    I.seeElement(locator.chessBoard.figureOnBoard(tile, figure));
    I.seeElement(locator.chessBoard.avatarOnBoard(tile));
    I.seeElement(locator.chessBoard.pointsOnBoard(tile, value));
  },
  voteIsNotVisible:(figure: string, tile: string, value: string) => {
    I.dontSeeElement(locator.chessBoard.figureOnBoard(tile, figure));
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
};