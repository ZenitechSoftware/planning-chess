const { I, game } = inject();
import username = require("../test_data/usernames");
import { ChessPiece } from "../test_data/ChessPieces";

export = {
  async checkIfTheFinalSPIsRoundedCorrectly(playerNumber: number) {
    let finalScore = 0;
    for (let i = 0; i < playerNumber; i++) {
      finalScore += Number(
        await I.grabTextFrom(game.locator.playersList.playerIndividualSP(i + 1))
      );
    }
    const averageScore = finalScore / playerNumber;
    const finalAverageScore = game.getExpectedPlayerSP(averageScore);
    const actualFinalScore = await I.grabNumberFrom(
      game.locator.playersList.totalSP
    );
    I.assertEqual(finalAverageScore, Number(actualFinalScore));
  },

  async checkTheTotalSPAfterOneOfThePlayersSkippedTheMove() {
    const firstPlayerScore = await game.getActualPlayerScore(username.user1);
    const totalSP = await I.grabNumberFrom(game.locator.playersList.totalSP);
    I.assertEqual(firstPlayerScore, Number(totalSP));
  },

  checkIfTheLinkWasCopied(currentUrl: string) {
    I.usePlaywrightTo("check clipboard", async ({ page, browserContext }) => {
      await browserContext.grantPermissions(["clipboard-read"]);
      const clipboardText = await page.evaluate(
        "navigator.clipboard.readText()"
      );
      I.assertEqual(currentUrl, clipboardText);
    });
  },

  checkSkippedBadgeColors: async (
    username: string,
    backgroundColor: string,
    fontColor: string
  ) => {
    const bgColor = await I.grabCssPropertyFrom(
      game.locator.playersList.playerSkippedBadge(username),
      "background-color"
    );
    I.assertEqual(backgroundColor, bgColor);
    const color = await I.grabCssPropertyFrom(
      game.locator.playersList.playerSkippedBadge(username),
      "color"
    );
    I.assertEqual(fontColor, color);
  },

  checkIndividualVoteColors: async (
    username: string,
    backgroundColor: string,
    fontColor: string
  ) => {
    const bgColor = await I.grabCssPropertyFrom(
      game.locator.playersList.voterScoreIcon(username),
      "background-color"
    );
    I.assertEqual(backgroundColor, bgColor);
    const color = await I.grabCssPropertyFrom(
      game.locator.playersList.voterScoreIcon(username),
      "color"
    );
    I.assertEqual(fontColor, color);
  },

  async checkIfUrlDidNotChange(previousGameRoomUrl: string) {
    const currentRoomUrl = await I.grabCurrentUrl();
    I.assertEqual(previousGameRoomUrl, currentRoomUrl);
  },

  async checkIfTheProfileImageIsUploaded(user: string, avatarImage: string) {
    const avatarImageInTheHeader = await I.grabAttributeFrom(
      game.locator.header.avatarProfilePictureHeader,
      "src"
    );
    I.assertEqual(avatarImageInTheHeader, avatarImage);
    const avatarImageInPlayersList = await I.grabAttributeFrom(
      game.locator.playersList.avatarImageInThePlayersList(user),
      "src"
    );
    I.assertEqual(avatarImageInPlayersList, avatarImage);
  },

  async chessPieceOnBoard(chessPiece: ChessPiece, tile: string) {
    const expectedChessPiece = chessPiece.name;
    const actualChessPiece = await I.grabAttributeFrom(game.locator.chessBoard.tileWithChessPiece(tile), 'alt');
    I.assertEqual(expectedChessPiece, actualChessPiece);
  },

  async SPOnBoard(chessPiece: ChessPiece, tile: string) {
    const expectedValue = chessPiece.value + 'SP';
    const actualValue = await I.grabTextFrom(game.locator.chessBoard.tileWithPoints(tile));
    I.assertEqual(expectedValue, actualValue);
  },
};
