const { I, game } = inject();

export = {
  async checkIfTheLinkWasCopied (currentUrl) {
    I.usePlaywrightTo('check clipboard', async ({ page, browserContext }) => {
      await browserContext.grantPermissions(['clipboard-read']);
      const clipboardText = await page.evaluate("navigator.clipboard.readText()");
      I.assertEqual(currentUrl, clipboardText);
    });
  },

  checkSkippedBadgeColorsWhenGameIsInProgress: async (username:string) => {
    const bgColor = await I.grabCssPropertyFrom(game.locator.playersList.skippedBadge(username), 'background-color');
    I.assertEqual('rgba(183, 192, 216, 0.44)', bgColor);
    const color = await I.grabCssPropertyFrom(game.locator.playersList.skippedBadge(username), 'color');
    I.assertEqual('rgb(102, 102, 102)', color); 
  },

  checkSkippedBadgeColorsWhenGameIsCompleted: async (username: string) => {
    const bgColor = await I.grabCssPropertyFrom(game.locator.playersList.skippedBadge(username), 'background-color');
    I.assertEqual('rgb(158, 107, 17)', bgColor);
    const color = await I.grabCssPropertyFrom(game.locator.playersList.skippedBadge(username), 'color');
    I.assertEqual('rgb(255, 255, 255)', color); 
  },

  checkIndividualVoteColorsWhenGameIsInProgress: async (username: string) => {
    const bgColor = await I.grabCssPropertyFrom(game.locator.playersList.voterScoreIcon(username), 'background-color');
    I.assertEqual('rgba(183, 192, 216, 0.44)', bgColor);
    const color = await I.grabCssPropertyFrom(game.locator.playersList.voterScoreIcon(username), 'color');
    I.assertEqual('rgb(102, 102, 102)', color);
  },
  
  checkIndividualVoteColorsWhenGameIsCompleted: async (username: string) => {
    const bgColor = await I.grabCssPropertyFrom(game.locator.playersList.voterScoreIcon(username), 'background-color');
    I.assertEqual('rgb(42, 115, 5)', bgColor);
    const color = await I.grabCssPropertyFrom(game.locator.playersList.voterScoreIcon(username), 'color');
    I.assertEqual('rgb(255, 255, 255)', color);
  },
};
