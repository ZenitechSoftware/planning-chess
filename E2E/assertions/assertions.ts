const { I, game } = inject();
import username = require("../test_data/usernames");

export = {

  async checkIfTheFinalSPIsRoundedCorrectly(playerNumber:number) {
    let finalScore = 0
    for(let i = 0; i < playerNumber; i++){
      finalScore += Number(await I.grabTextFrom(game.locator.playersList.playerIndividualSP(i+1)));
    }
    let averageScore = finalScore/playerNumber;
    let finalAverageScore = game.getExpectedPlayerSP(averageScore);
    const actualFinalScore = await I.grabNumberFrom(game.locator.playersList.totalSP);
    I.assertEqual(finalAverageScore, Number(actualFinalScore));
  },

  async checkTheTotalSPAfterOneOfThePlayersSkippedTheMove(){
    const firstPlayerScore = await game.getActualPlayerScore(username.user1);
    const totalSP = await I.grabNumberFrom(game.locator.playersList.totalSP);
    I.assertEqual(firstPlayerScore, Number(totalSP));
  },

  async checkIfTheLinkWasCopied (currentUrl: string) {
    I.usePlaywrightTo('check clipboard', async ({ page, browserContext }) => {
      await browserContext.grantPermissions(['clipboard-read']);
      const clipboardText = await page.evaluate("navigator.clipboard.readText()");
      I.assertEqual(currentUrl, clipboardText);
    });
  },

  async checkIfTheProfileImageIsUploaded( user: string, avatarImage: string) {
    const avatarImageInTheHeader = await I.grabAttributeFrom(game.locator.header.avatarProfilePictureHeader, 'src');
    I.assertEqual(avatarImageInTheHeader, avatarImage);
    const avatarImageInPlayersList = await I.grabAttributeFrom(game.locator.playersList.avatarImageInThePlayersList(user), 'src');
    I.assertEqual(avatarImageInPlayersList, avatarImage); 
  }
};
