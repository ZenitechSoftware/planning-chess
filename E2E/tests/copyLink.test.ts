Feature('Copy link');

const { I, login, game } = inject();

import assertions = require("../assertions/assertions");
import username = require("../test_data/usernames");

Before(() => {
  I.amOnPage('/');
});

Scenario('Player can copy a game link',() => {
  login.firstVoterLogin(username.user1);
  game.checkCopyLinkButton();
});

Scenario('Spectator can copy a game link',() => {
    login.firstSpectatorLogin(username.user2);
    game.checkCopyLinkButton();
});

Scenario('Check if the link in the clipboard was copied correctly', async () => {
  login.firstVoterLogin(username.user1);
  const currentUrl = await I.grabCurrentUrl();
  I.waitForElement(game.locator.buttons.copyLink);
  I.click(game.locator.buttons.copyLink); 
  await assertions.checkIfTheLinkWasCopied(currentUrl);
});
