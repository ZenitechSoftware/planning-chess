const { I } = inject();

const locator = {
      firstUserInList: '//div[contains(@data-testid, "0")]//div[@class="team-list-item-name"]',
      secondUserInList: '//div[contains(@data-testid, "1")]//div[@class="team-list-item-name"]',

      username: '#username',

      spectatorIcon: '//div[@class="team-list-item-avatar spectator-avatar f-center"]//img[@alt="spectator icon"]', 

      chessBoard: '#chess-board',
      chessPiecesContainer: '$chess-pieces-container',

      buttons: {
        copyLink: '//button[@class="copy-btn border-r-4 padding-sm gap-s align-c"]//p["Copy Link"]',
        restartGame: '//button[@class="ant-btn css-sk7ap8 ant-btn-ghost border-r-4 padding-y-s weight-500 padding-x-m gap-s f-center margin-auto ghost-btn"]/span["Restart game"]',
      }
  };


  export = {
    checkFirsNameInList: (username: string) => {
      I.see(username, locator.firstUserInList);
    },
    checkSecondNameInList: (username: string) => {
      I.see(username, locator.secondUserInList);
    },
    spectatorIcon: () => {
      I.waitForVisible(locator.spectatorIcon, 5);
    },
    checkUsername: (username: string) => {
      I.seeTextEquals(username, locator.username)
    },
    waitingForMorePlayersStatus: () => {
      I.see('Waiting for more players');
      I.seeElement(locator.chessBoard);
      I.dontSeeElement(locator.chessPiecesContainer);
      I.seeElement(locator.buttons.copyLink);
      I.seeElement(locator.buttons.restartGame);

    }
  
  };