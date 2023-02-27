const { I, game } = inject();

export = {
    async checkIfTheLinkWasCopied (currentUrl) {
      I.usePlaywrightTo('check clipboard', async ({ page, browserContext }) => {
        await browserContext.grantPermissions(['clipboard-read']);
        const clipboardText = await page.evaluate("navigator.clipboard.readText()");
        I.assertEqual(currentUrl, clipboardText);
      });
  },

  async checkIfTheSPIsRoundedCorrectlyForTheFirstPlayer() {
    const averageFirstPlayerSP = game.calculateAverage("bishop", "d", 3);
    let expectedFirstPlayerScore = game.checkPlayerSP(averageFirstPlayerSP);
    let actualFirstPlayerSP = Number(await I.grabTextFrom(game.locator.playersList.playerIndividualSP(2)));
    I.assertEqual(actualFirstPlayerSP, expectedFirstPlayerScore );
  },

  async checkIfTheSPIsRoundedCorrectlyForTheSecondPlayer() {
    const averageSecondPlayerSP = game.calculateAverage("queen", "f", 5);
    let expectedSecondPlayerScore = game.checkPlayerSP(averageSecondPlayerSP);
    let actualSecondPlayerSP = Number(await I.grabTextFrom(game.locator.playersList.playerIndividualSP(1)));
    I.assertEqual(actualSecondPlayerSP, expectedSecondPlayerScore);
  },

  async checkIfTheFinalSPIsRoundedCorrectly() {
    let actualFirstPlayerSP = Number(await I.grabTextFrom(game.locator.playersList.playerIndividualSP(2)));
    let actualSecondPlayerSP = Number(await I.grabTextFrom(game.locator.playersList.playerIndividualSP(1)));
    const averageFinalScore = (actualFirstPlayerSP + actualSecondPlayerSP)/2;
    let expectedFinalScore = game.checkPlayerSP(averageFinalScore);
    const actualFinalScore = Number((await I.grabTextFrom(game.locator.playersList.totalSP)).slice(16, -3));
    I.assertEqual(expectedFinalScore, actualFinalScore);
  },

  async checkTheTotalSPAfterOneOfThePlayersSkippedTheMove(){
    const firstPlayerScore = await I.grabTextFrom(game.locator.playersList.playerIndividualSP(1));
    const totalSP = (await I.grabTextFrom(game.locator.playersList.totalSP)).slice(16, -3);
    I.assertEqual(firstPlayerScore, totalSP);
  },
};
