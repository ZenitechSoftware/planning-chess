Feature("team list");

import username = require("../test_data/usernames");
import ChessTile = require("../test_data/chessTiles");
import { ChessPiece } from "../test_data/chessPieces";
const { I, login, game } = inject();

Scenario(
  "Players who skipped their moves are at the bottom of the list",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    session(username.user4, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user4);
      game.vote(ChessPiece.queen, ChessTile.f6);
    });
    session(username.user2, () => {
      game.vote(ChessPiece.bishop, ChessTile.a1);
    });
    session(username.user3, () => {
      I.click(game.locator.buttons.skip);
      I.click(game.locator.buttons.skipOtherPlayer(username.user1));
      I.waitForText("Game complete");
      const expectedUserOrder = [
        username.user4,
        username.user2,
        username.user3,
        username.user1,
      ];
      expectedUserOrder.forEach((username, index) => {
        I.see(
          `${username}`,
          game.locator.playersList.playerUsernameByIndex(index + 1)
        );
      });
    });
  }
);

Scenario(
  "Current voter is at the top of the list while game is in progress",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    I.seeTextEquals(
      `${username.user1} (you)`,
      game.locator.playersList.playerUsernameByIndex(1)
    );
    session(username.user2, () => {
      I.seeTextEquals(
        `${username.user2} (you)`,
        game.locator.playersList.playerUsernameByIndex(1)
      );
    });
  }
);

Scenario(
  "Players are listed based on individual final score in descending order",
  async () => {
    login.firstVoterLogin(username.user1);
    const url = await I.grabCurrentUrl();
    session(username.user2, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user2);
    });
    session(username.user3, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user3);
    });
    session(username.user4, () => {
      login.voterLoginIntoCreatedGameRoom(url, username.user4);
      game.vote(ChessPiece.queen, ChessTile.f6);
    });
    session(username.user2, () => {
      game.vote(ChessPiece.knight, ChessTile.c3);
    });
    session(username.user3, () => {
      game.vote(ChessPiece.rook, ChessTile.d3);
    });
    game.vote(ChessPiece.pawn, ChessTile.a1);
    const expectedUserOrder = [
      username.user4,
      username.user3,
      username.user2,
      username.user1,
    ];
    expectedUserOrder.forEach((username, index) => {
      I.see(
        `${username}`,
        game.locator.playersList.playerUsernameByIndex(index + 1)
      );
    });
  }
);

Scenario("Game info is displayed in game info field", async () => {
  login.firstVoterLogin(username.user1);
  const url = await I.grabCurrentUrl();
  session(username.user2, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user2);
  });
  session(username.user3, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user3);
  });
  session(username.user4, () => {
    login.voterLoginIntoCreatedGameRoom(url, username.user4);
    game.vote(ChessPiece.queen, ChessTile.f6);
    I.see("1", game.locator.playersList.playersDoneCount);
  });
  game.vote(ChessPiece.queen, ChessTile.f6);
  I.see("2", game.locator.playersList.playersDoneCount);
  session(username.user3, () => {
    game.skipMove();
    I.see("1", game.locator.playersList.playersSkippedCount);
    I.click(game.locator.buttons.skipOtherPlayer(username.user2));
    I.see("2", game.locator.playersList.playersSkippedCount);
  });
});
