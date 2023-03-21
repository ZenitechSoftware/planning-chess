Feature('new room button');

import username = require("../test_data/usernames");

const { I, login, game } = inject();

Scenario('Voter clicks "New room" while waiting for more players', async () => {
    login.firstVoterLogin(username.user1);
    const firstRoomUrl = await I.grabCurrentUrl();
    game.createNewRoomAndCompareUrl(firstRoomUrl);
});

Scenario('Spectator clicks "New room" while waiting for more players', async () => {
    login.firstSpectatorLogin(username.user1);
    const firstRoomUrl = await I.grabCurrentUrl();
    game.createNewRoomAndCompareUrl(firstRoomUrl);
});