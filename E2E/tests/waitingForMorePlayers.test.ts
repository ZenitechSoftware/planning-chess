Feature('game status "Waiting for more players"')

Before(async ({ I, login, username }) => {
    I.amOnPage('/');
    login.login(username.user1);
});

Scenario('Player who enters game first chooses spectator role', async ({ I, game, username, roles }) => {
    roles.spectatorLogin();
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.seeElement(game.locator.playersList.spectatorIcon);
    I.seeTextEquals(username.user1, game.locator.text.username);
    game.waitingForMorePlayersStatus();

});

Scenario('Player who enters game first chooses voter role', async ({ I, game, roles, username }) => {
    roles.voterLogin();
    I.see(username.user1, game.locator.playersList.firstUserInList);
    I.seeTextEquals(username.user1, game.locator.text.username);
    game.waitingForMorePlayersStatus();
});

Scenario('One voter and other players as spectators can’t play the game', async ({ I, login, roles, username }) => {
    roles.voterLogin();
    I.waitForText('Waiting for more players');
    let url = await I.grabCurrentUrl();
    session(username.user2, () => {
        login.loginIntoCreatedGameRoom(url, username.user2);
        roles.spectatorLogin();
        I.waitForText('Waiting for more players');
    });
    session(username.user3, () => {
        login.loginIntoCreatedGameRoom(url, username.user3);
        roles.spectatorLogin();
        I.waitForText('Waiting for more players');
    });
});


