const { I, game } = inject();
import { ChessPiece } from "../test_data/ChessPieces";

const locator = {
  playersList: {
    playersList: '//div[contains(@data-testid, "list")]/div[@class="team-list-item-name"]',
    firstUserInList: '//*[contains(@data-testid, "0")]/div[@class="team-list-item-name"]',
    secondUserInList: '//*[contains(@data-testid, "1")]/div[@class="team-list-item-name"]',
    playerUsernameByIndex: (rowNumberInList: number) => locate('//*[@class="team-list-item-name"]').at(rowNumberInList),
    spectatorIcon: '//*[@class="team-list-item-avatar spectator-avatar f-center"]//img[@alt="spectator icon"]',
    playerDefaultIcon:(username:string) => `//*[contains(@data-testid, '${username}')]//*[contains(@class, 'ant-avatar-circle')]//span['#username']`,
    avatarImageInThePlayersList: (username: string) => `//*[contains(@data-testid, '${username}')]//img[@alt='profile pic']`,
    playerDoneIcon: (username: string) => `//*[contains(@data-testid, '${username}')]/img[@alt='player done icon']`,
    playerSkippedIcon: (username: string) => `//*[contains(@data-testid, '${username}')]/img[@alt='player skipped icon']`,
    playerSkippedBadge: (username: string) => `//*[contains(@data-testid, '${username}')]/*[text()='Skipped']`,
    voterScoreIcon: (username: string) =>`//*[contains(@data-testid, '${username}')]/*[contains(@class, 'team-list-voter-score')]`,
    playersSkippedCount: '$players-skipped-count',
    playersDoneCount: '$players-done-count',
    playerCount:(playersNumber: number) =>`//*[contains(@data-testid, "players-count") and contains(text(), '${playersNumber}')]`,
  },
  text: {
    username: '#username',
    linkCopiedToClipboard: '//*[text() = "Link copied to clipboard"]',
    youHaveAnotherActiveSession:'//*[text() = "You have another active session"]',
    skipMoveTooltip: '//*[text() = "Mark my move as complete, without any story points"]',
    uploadProfilePicture: '//*[text() = "Upload profile picture"]',
    enterLinkOfTheImage: '//*[text() = "Enter a link of the image"]',
    urlDoesNotContainImageErrorMessage: '//*[text() = "The provided URL does not contain a valid image"]',
    waitingForMorePlayers: '//*[text() = "Waiting for more players"]',
    gameInProgress: '//*[text() = "Game in progress..."]',
  },
  chessBoard: {
    board: '#chess-board',
    chessTile: (tile: string) => `$chess-tile-${tile}`,
    chessPieceOnBoard: (tile: string, chessPiece: ChessPiece) => `//*[@data-testid='chess-tile-${tile}']//img[@alt='${chessPiece}']`,
    avatarOnBoard: (tile: string) => `//*[@data-testid='chess-tile-${tile}']//div[@class='bubble-container']//span[@class='ant-avatar-string']`,
    avatarPictureOnBoard:(tile: string) => `//*[@data-testid='chess-tile-${tile}']//div[@class='bubble-container']//img[@alt='profile pic']`,
    pointsOnBoard: (tile: string, value: string) => `//*[@data-testid='chess-tile-${tile}']//span[@class='figure-text'][contains(text(), '${value}')]`,
  },
  chessPieces: {
    container: '#chess-pieces-container',
    chessPiece: (chessPiece: ChessPiece) => `$${chessPiece}-piece-btn`,
    chessPieceHighlighted: (chessPiece: ChessPiece) => `//button[@data-testid="${chessPiece}-piece-btn"][contains(@class, "selected")]`,
  },
  buttons: {
    copyLinkHeader: locate('//*[text() = "Copy Link"]').at(1),
    copyLink: '//button/p[contains(text(), "Copy Link")]',
    restartGame: '//button/span[contains(text(), "Restart game")]',
    skip: '$skip-piece-btn', 
    skipButtonHighlighted: `//button[@data-testid="skip-piece-btn"][contains(@class, "selected")]`,
    skipOtherPlayer: (username: string) =>`//*[contains(@data-testid,'${username}')]//*[@alt='skip other player button icon']`,
    uploadPhoto:'$modal-url-input-confirm-button',
    confirm: '$modal-upload-picture-button',
    uploadAnotherImage: '$modal-go-back-button',
  },
  input: {
    imageLink:'#modal-avatar-input',
  },
  popUp: {
    uploadProfilePicture:'//*[@class="ant-modal-content"]',
    avatarPictureInThePopUp: '//*[contains(@class, "ant-modal-content")]//*[contains(@class, "ant-avatar-circle")]//img[@alt="profile pic"]',
    avatarDefaultPicture: '//*[contains(@class, "avatar-modal-second-step")]//*[contains(@class, "ant-avatar-circle")]//span["#username"]', 
  },
  header: {
    playerDefaultAvatarPicture: '//*[contains(@data-testid, "game-header-dropdown-button")]//*[contains(@class, "ant-avatar-circle")]//span["#username"]',
    avatarProfilePictureHeader: '//*[contains(@data-testid, "game-header-dropdown-button")]//img[@alt="profile pic"]',
    dropdownIcon: '$game-header-dropdown-button',
  },
  headerDropdownList: {
    changeProfilePicture: '#dropdown-change-avatar',
    newRoom: '#dropdown-create-new-room',
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
    I.seeElement(locator.buttons.copyLinkHeader);
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
    I.waitForVisible(locator.chessPieces.chessPieceHighlighted(chessPiece));
    I.click(locator.chessBoard.chessTile(tile));
  },
  voteIsVisible:(chessPiece: ChessPiece, tile: string, value: string) => {
    I.seeElement(locator.chessBoard.chessPieceOnBoard(tile, chessPiece));
    I.seeElement(locator.chessBoard.avatarOnBoard(tile));
    I.seeElement(locator.chessBoard.pointsOnBoard(tile, value));
  },
  voteIsNotVisible:(chessPiece: ChessPiece, tile: string, value: string) => {
    I.dontSeeElement(locator.chessBoard.chessPieceOnBoard(tile, chessPiece));
    I.dontSeeElement(locator.chessBoard.avatarOnBoard(tile));
    I.dontSeeElement(locator.chessBoard.pointsOnBoard(tile, value));
  },

  checkCopyLinkButton: () => {
    I.waitForElement(locator.buttons.copyLinkHeader);
    I.click(locator.buttons.copyLinkHeader);
    I.waitForElement(locator.text.linkCopiedToClipboard);
    I.waitForInvisible(locator.text.linkCopiedToClipboard);
    I.click(locator.buttons.copyLinkHeader);
    I.waitForElement(locator.text.linkCopiedToClipboard);
  },
  getNumberOfPlayersInList: async () => {
    let numberOfPlayers = await I.grabNumberOfVisibleElements(locator.playersList.playersList);
    return numberOfPlayers;
  },

  duplicateTab: () => {
    I.openNewTab();
    I.amOnPage('/');
    I.waitForElement(locator.text.youHaveAnotherActiveSession);
    I.switchToPreviousTab();
    I.seeElement(locator.chessBoard.board);
  }, 
  skipMove: () => {
    I.click(locator.buttons.skip);
    I.seeElement(locator.buttons.skipButtonHighlighted);
  },
  voteAndCheckThatVoteIsVisible:(chessPiece: ChessPiece, tile: string, value:string) => {
    game.vote(chessPiece, tile);
    game.voteIsVisible(chessPiece, tile, value);
  },

  navigateBackAndForward: () => {
    I.executeScript("window.history.back();");
    I.waitForInvisible(game.locator.chessBoard.board);
    I.executeScript("window.history.forward();");
  },
  
  avatarPictureIsVisibleOnTheBoard: (chessPiece: ChessPiece, tile: string, value: string) => {
    I.seeElement(locator.chessBoard.chessPieceOnBoard(tile, chessPiece));
    I.seeElement(locator.chessBoard.avatarPictureOnBoard(tile));
    I.seeElement(locator.chessBoard.pointsOnBoard(tile, value));
  },

  uploadAvatarPhoto: (imageLink: string) => {
    I.click(locator.text.username);
    I.waitForElement(locator.headerDropdownList.changeProfilePicture);
    I.click(locator.headerDropdownList.changeProfilePicture);
    I.waitForElement(locator.text.uploadProfilePicture);
    I.seeElement(locator.text.enterLinkOfTheImage);
    I.fillField(locator.input.imageLink, imageLink);
    I.click(locator.buttons.uploadPhoto);
  },

  confirmAvatarPhotoWhenImageLinkIsValid: async (imageLink: string) => {
    const profileImageInThePopUp = await I.grabAttributeFrom(locator.popUp.avatarPictureInThePopUp, 'src');
    I.assertEqual(profileImageInThePopUp, imageLink);
    I.seeElement(locator.buttons.confirm);
    I.seeElement(locator.buttons.uploadAnotherImage);
    I.click(locator.buttons.confirm);
    I.waitForInvisible(locator.popUp.uploadProfilePicture);
  },

  createNewRoomAndCompareUrl: async (firstRoomUrl: string) => {
    I.click(game.locator.header.dropdownIcon);
    I.click(game.locator.headerDropdownList.newRoom);
    I.waitForElement(game.locator.text.waitingForMorePlayers);
    const newRoomUrl = await I.grabCurrentUrl();
    I.assertNotEqual(firstRoomUrl, newRoomUrl);
    const countOfOpenTabs = await I.grabNumberOfOpenTabs();
    I.assertEqual(countOfOpenTabs, 1);
  },
};