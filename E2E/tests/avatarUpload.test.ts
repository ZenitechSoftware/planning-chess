Feature('Avatar upload')

const { I, login, game } = inject();
import username = require("../test_data/usernames");
import imageLink = require("../test_data/imageLinks");
import ChessTile = require("../test_data/chessTiles");
import { ChessPiece } from "../test_data/chessPieces";
import { ChessPieceValue } from "../test_data/chessPieces";
import assertions = require("../assertions/assertions");

Scenario('Player uploads avatar during login', async () => { 
  login.voterUploadAvatarDuringLogin(username.user1, imageLink.dogImageLink);
  await assertions.checkIfTheProfileImageIsUploaded(username.user1, imageLink.dogImageLink);
});

Scenario('Spectator uploads avatar during login', async() => { 
  login.spectatorUploadAvatarDuringLogin(username.user1, imageLink.birdImageLink);
  const avatarImageTopRightCorner = await I.grabAttributeFrom(game.locator.header.avatarProfilePictureHeader, 'src');
  I.assertEqual(avatarImageTopRightCorner, imageLink.birdImageLink);
  I.seeElement(game.locator.playersList.spectatorIcon); 
});

Scenario('Player uploads avatar in the game room', async () => { 
  login.firstVoterLogin(username.user1);
  game.uploadAvatarPhoto(imageLink.dogImageLink);
  await game.confirmAvatarPhotoWhenImageLinkIsValid(imageLink.dogImageLink);
  await assertions.checkIfTheProfileImageIsUploaded(username.user1, imageLink.dogImageLink);
});

Scenario('Player changes avatar image in the game room', async () => { 
  login.voterUploadAvatarDuringLogin(username.user1, imageLink.dogImageLink);
  await assertions.checkIfTheProfileImageIsUploaded(username.user1, imageLink.dogImageLink);
  game.uploadAvatarPhoto(imageLink.birdImageLink);
  await game.confirmAvatarPhotoWhenImageLinkIsValid(imageLink.birdImageLink);
  await assertions.checkIfTheProfileImageIsUploaded(username.user1, imageLink.birdImageLink);
});

Scenario('Invalid image link is entered in avatar link field during login', () => { 
  login.voterUploadAvatarDuringLogin(username.user1, imageLink.invalidImageLink);
  I.seeElement(game.locator.header.playerDefaultAvatarPicture);
  I.seeElement(game.locator.playersList.playerDefaultIcon(username.user1));
});

Scenario('Invalid image link is entered in avatar link field in the game room', async () => { 
  login.firstVoterLogin(username.user1);
  game.uploadAvatarPhoto(imageLink.invalidImageLink);
  I.seeElement(game.locator.text.urlDoesNotContainImageErrorMessage);
  I.seeElement(game.locator.popUp.avatarDefaultPicture);
  I.click(game.locator.buttons.confirm);
  I.seeElement(game.locator.header.playerDefaultAvatarPicture);
  I.seeElement(game.locator.playersList.playerDefaultIcon(username.user1));
});

Scenario('Player who made a move on the chessboard changes his profile image', async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  game.voteAndCheckThatVoteIsVisible(ChessPiece.rook, ChessTile.a1, ChessPieceValue.rook);
  game.uploadAvatarPhoto(imageLink.dogImageLink);
  await game.confirmAvatarPhotoWhenImageLinkIsValid(imageLink.dogImageLink);
  session(username.user2, async () => {
    const firstPlayersImageOnThePlayersList = await I.grabAttributeFrom(game.locator.playersList.avatarImageInThePlayersList(username.user1), 'src');
    I.assertEqual(imageLink.dogImageLink, firstPlayersImageOnThePlayersList);
    game.voteIsNotVisible(ChessPiece.rook, ChessTile.a1, ChessPieceValue.rook);
    game.voteAndCheckThatVoteIsVisible(ChessPiece.pawn, ChessTile.b3, ChessPieceValue.pawn);
    I.waitForText('Game complete');
    game.avatarPictureIsVisibleOnTheBoard(ChessPiece.rook, ChessTile.a1, ChessPieceValue.rook);
  });
});

Scenario('Users avatar does not disappear after leaving and returning back to the game room', async () => { 
  login.voterUploadAvatarDuringLogin(username.user1, imageLink.dogImageLink);
  await assertions.checkIfTheProfileImageIsUploaded(username.user1, imageLink.dogImageLink);
  game.navigateBackAndForward();
  await assertions.checkIfTheProfileImageIsUploaded(username.user1, imageLink.dogImageLink);
});
