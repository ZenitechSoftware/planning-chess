Feature('game status "Waiting for more players"')

Scenario('Player who enters game first chooses spectator role', async ({ I, login, game }) => {
    const user1 = 'Name';
    I.amOnPage('/');
    login.spectatorLogin(user1);
    game.checkFirsNameInList(user1);
    game.spectatorIcon();
    game.waitingForMorePlayersStatus()
});

Scenario('Player who enters game first chooses voter role', async ({ I, login, game }) => {
    const user1 = 'Name';
    I.amOnPage('/');
    login.voterLogin(user1);
    game.checkFirsNameInList(user1);
    game.checkUsername(user1);
    game.waitingForMorePlayersStatus();
});

Scenario('One voter and other players as spectators can’t play the game', async ({ I, login }) => {
    const user1 = 'Name one';
    const user2 = 'Name two';
    const user3 = 'Name three';
    I.amOnPage('/');
    login.voterLogin(user1);
    I.waitForText('Waiting for more players');
    let url = await I.grabCurrentUrl();
    session(user2, () => {
        I.amOnPage(url);
        login.spectatorLogin(user2);
        I.waitForText('Waiting for more players');
    });
    session(user3, () => {
        I.amOnPage(url);
        login.spectatorLogin(user3);
        I.waitForText('Waiting for more players');
    });
});


