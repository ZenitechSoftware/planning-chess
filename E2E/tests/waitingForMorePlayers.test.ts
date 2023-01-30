Feature('game status "Waiting for more players"')

Before(async ({ I }) => {
    I.amOnPage('/');
});

Scenario('Player who enters game first chooses spectator role', async ({ I, login, game, username }) => {
    login.spectatorLogin(username.user1);
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.seeElement(game.locator.playersList.spectatorIcon);
    I.seeTextEquals(username.user1, game.locator.text.username);
    game.waitingForMorePlayersStatus();

});

Scenario('Player who enters game first chooses voter role', async ({ I, login, game, username }) => {
    login.voterLogin(username.user1);
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.seeTextEquals(username.user1, game.locator.text.username);
    game.waitingForMorePlayersStatus();
});

Scenario('One voter and other players as spectators can’t play the game', async ({ I, login, username }) => {
    login.voterLogin(username.user1);
    I.waitForText('Waiting for more players');
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        I.amOnPage(url);
        login.spectatorLogin(username.user2);
        I.waitForText('Waiting for more players');
    });
    session(username.user3, () => {
        I.amOnPage(url);
        login.spectatorLogin(username.user3);
        I.waitForText('Waiting for more players');
    });
});


