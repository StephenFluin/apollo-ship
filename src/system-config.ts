// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'angular2-google-maps': 'vendor/angular2-google-maps',
  'angular2-apollo': 'vendor/angular2-apollo/build/src',
  'apollo-client': 'vendor/apollo-client',
  'graphql-tag': 'vendor/graphql-tag',
  'whatwg-fetch': 'vendor/whatwg-fetch',
  'lodash': 'vendor/lodash'
};

/** User packages configuration. */
const packages: any = {
  'angular2-google-maps/core': {
    defaultExtension: 'js',
    main: 'index.js' // you can also use core.umd.js here, if you want faster loads
  },
  'angular2-apollo': {
    defaultExtension: 'js',
    main: 'index.js'
  },
  'apollo-client': {
    defaultExtension: 'js',
    main: 'index.js'
  },
  'graphql-tag': {
    defaultExtension: 'js',
    main: 'index.js'
  },
  'whatwg-fetch': {
    defaultExtension: 'js',
    main: 'fetch.js'
  },
  'lodash': {
    defaultExtension: 'js',
    main: 'index.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',
  'apollo-client',
  'angular2-apollo',
  'graphql-tag',
  'whatwg-fetch',
  'lodash',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
