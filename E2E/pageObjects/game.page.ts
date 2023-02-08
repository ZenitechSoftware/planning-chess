const { I } = inject();

const locator = {
  playersList: {
    firstUserInList: '//div[contains(@data-testid, "0")]/div[@class="team-list-item-name"]',
    secondUserInList: '//div[contains(@data-testid, "1")]/div[@class="team-list-item-name"]',
    playersList: '//div[contains(@data-testid, "list")]/div[@class="team-list-item-name"]',
    spectatorIcon: '//div[@class="team-list-item-avatar spectator-avatar f-center"]//img[@alt="spectator icon"]',
  },
  text: {
    username: '#username',
    linkCopiedToClipboard: '//*[text() = "Link copied to clipboard"]',
    youHaveAnotherActiveSession:'//*[text() = "You have another active session"]',
  },
  chessBoard: {
    board: '#chess-board',
  },
  chessPieces: {
    container: '$chess-pieces-container',
  },
  buttons: {
    copyLinkHeader: locate('//*[text() = "Copy Link"]').at(1),
    copyLink: 'button/p[contains(text(), "Copy Link")]',
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

  checkCopyLinkButton: () => {
    I.waitForElement(locator.buttons.copyLinkHeader);
    I.click(locator.buttons.copyLinkHeader);
    I.waitForElement(locator.text.linkCopiedToClipboard);
    I.waitForInvisible(locator.text.linkCopiedToClipboard);
    I.click(locator.buttons.copyLinkHeader);
    I.waitForElement(locator.text.linkCopiedToClipboard);
  },

   getPlayersList: async () => {
    let playerList = await I.grabNumberOfVisibleElements(locator.playersList.playersList);
    return playerList;
  },

  playerCannotAccessTheBoardFromNewTab: () => {
    I.openNewTab();
    I.amOnPage('/');
    I.waitForElement(locator.text.youHaveAnotherActiveSession);
    I.switchToPreviousTab();
    I.seeElement(locator.chessBoard.board);
  },
};