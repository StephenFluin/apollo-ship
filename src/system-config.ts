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
  'redux': 'vendor/redux/dist/redux.min.js',
  'symbol-observable': 'vendor/symbol-observable',
  'lodash': 'vendor/lodash',
  'lodash.isundefined': 'vendor/lodash',
  'lodash.assign': 'vendor/lodash',
  'lodash.forown': 'vendor/lodash',
  'lodash.isequal': 'vendor/lodash',
  'lodash.isarray': 'vendor/lodash',
  'lodash.isnull': 'vendor/lodash',
  'lodash.includes': 'vendor/lodash',
  'lodash.countby': 'vendor/lodash',
  'lodash.identity': 'vendor/lodash',
  'lodash.clonedeep': 'vendor/lodash',
  'lodash.isstring': 'vendor/lodash',
  'lodash.has': 'vendor/lodash',
  'lodash.mapvalues': 'vendor/lodash',
  'lodash.isnumber': 'vendor/lodash'
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
  'redux': {
    format: 'cjs',
    defaultExtension: 'js'
  },
  'symbol-observable': {
    defaultExtension: 'js',
    main: 'index.js'
  },
  'lodash': {
    defaultExtension: 'js',
    main: 'index.js'
  },
  'lodash.isundefined': {
    defaultExtension: 'js',
    main: 'isUndefined.js'
  },
  'lodash.assign': {
    defaultExtension: 'js',
    main: 'assign.js'
  },
  'lodash.forown': {
    defaultExtension: 'js',
    main: 'forOwn.js'
  },
  'lodash.isequal': {
    defaultExtension: 'js',
    main: 'isEqual.js'
  },
  'lodash.isarray': {
    defaultExtension: 'js',
    main: 'isArray.js'
  },
  'lodash.isnull': {
    defaultExtension: 'js',
    main: 'isNull.js'
  },
  'lodash.clonedeep': {
    defaultExtension: 'js',
    main: 'cloneDeep.js'
  },
  'lodash.includes': {
    defaultExtension: 'js',
    main: 'includes.js'
  },
  'lodash.countby': {
    defaultExtension: 'js',
    main: 'countBy.js'
  },
  'lodash.identity': {
    defaultExtension: 'js',
    main: 'identity.js'
  },
  'lodash.isstring': {
    defaultExtension: 'js',
    main: 'isString.js'
  },
  'lodash.has': {
    defaultExtension: 'js',
    main: 'has.js'
  },
  'lodash.mapvalues': {
    defaultExtension: 'js',
    main: 'mapValues.js'
  },
  'lodash.isnumber': {
    defaultExtension: 'js',
    main: 'isNumber.js'
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
  'redux',
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
