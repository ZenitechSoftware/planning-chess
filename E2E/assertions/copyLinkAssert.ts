const { I, game } = inject();

export = {
  async checkIfTheLinkWasCopied (currentUrl) {
    I.usePlaywrightTo('check clipboard', async ({ page, browserContext }) => {
      await browserContext.grantPermissions(['clipboard-read']);
      const clipboardText = await page.evaluate("navigator.clipboard.readText()");
      I.assertEqual(currentUrl, clipboardText);
    });
  },

  async checkIfTheNumberOfPlayersRemainsTheSame (totalPlayersNumber) {
    const secondCheck = await game.getPlayersList();
    I.assertEqual(totalPlayersNumber, secondCheck);
  },
};
