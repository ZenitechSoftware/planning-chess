import copyLinkAssert = require("../assertions/copyLinkAssert");

Feature('Copy link');

const { I, login, username, game } = inject();

Before(() => {
  I.amOnPage('/');
});

Scenario('Player can copy a game link',() => {
  login.voterLogin(username.user1);
  game.checkCopyLinkButton();
});

Scenario('Spectator can copy a game link',() => {
    login.spectatorLogin(username.user2);
    game.checkCopyLinkButton();
});

Scenario('Check if the link in the clipboard was copied correctly', async () => {
  login.voterLogin(username.user1);
  const currentUrl = await I.grabCurrentUrl();
  I.waitForElement(game.locator.buttons.copyLink);
  I.click(game.locator.buttons.copyLink); 
  await copyLinkAssert.checkIfTheLinkWasCopied(currentUrl);
});
