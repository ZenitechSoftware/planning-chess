/// <reference types='codeceptjs' />

type login = typeof import('../pageObjects/login.page');
type game = typeof import('../pageObjects/game.page');
type roles = typeof import('../pageObjects/roleSelection.page');
type username = typeof import('../test_data/usernames');
type chessPiece = typeof import('../test_data/chessPieces');
type chessTile = typeof import('../test_data/chessTiles');
type copyLinkAssert = typeof import('../assertions/copyLinkAssert');
type ChaiWrapper = import('codeceptjs-chai');


type CustomHelper = import('../helpers/customSteps.helper');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
    login: login;
    game: game;
    roles: roles;
    username: username;
    chessPiece: chessPiece;
    chessTile: chessTile;
  
    copyLinkAssert: copyLinkAssert;
  }
  interface Methods extends CustomHelper, Playwright, ChaiWrapper { }
  interface I extends WithTranslation<Methods>, WithTranslation<ChaiWrapper> { }
  namespace Translation {
    interface Actions { }
  }
}
