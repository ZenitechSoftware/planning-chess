const { I, game } = inject();

export = {
    async checkIfTheLinkWasCopied (currentUrl) {
      I.usePlaywrightTo('check clipboard', async ({ page, browserContext }) => {
        await browserContext.grantPermissions(['clipboard-read']);
        const clipboardText = await page.evaluate("navigator.clipboard.readText()");
        I.assertEqual(currentUrl, clipboardText);
      });
  },

  async checkIfTheFinalSPIsRoundedCorrectly(playerNumber:number) {
    let finalScore = 0
    for(let i = 0; i < playerNumber; i++){
      finalScore += await game.getActualPlayerScore(i+1);
    }
    let averageScore = finalScore/playerNumber;
    let finalAverageScore = game.getExpectedPlayerSP(averageScore);
    const actualFinalScore = await game.finalScore(await I.grabTextFrom(game.locator.playersList.totalSP));
    I.assertEqual(finalAverageScore, actualFinalScore);
  },

  async checkTheTotalSPAfterOneOfThePlayersSkippedTheMove(){
    const firstPlayerScore = await game.getActualPlayerScore(1);
    const totalSP = await game.finalScore(await I.grabTextFrom(game.locator.playersList.totalSP));
    I.assertEqual(firstPlayerScore, totalSP);
  },
};
