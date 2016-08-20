var map = {
    'angular2-google-maps': 'vendor/angular2-google-maps',
    'angular2-apollo': 'vendor/angular2-apollo/build/src',
    'apollo-client': 'vendor/apollo-client',
    'graphql': 'vendor/graphql',
    'graphql-tag': 'vendor/graphql-tag',
    'whatwg-fetch': 'vendor/whatwg-fetch',
    'redux': 'vendor/redux/dist/redux.min.js',
    'symbol-observable': 'vendor/symbol-observable',
    'lodash': 'vendor/lodash',
    'lodash.omit': 'vendor/lodash.omit',
    '@angular2-material': 'vendor/@angular2-material',
};
var packages = {
    'angular2-google-maps/core': {
        defaultExtension: 'js',
        main: 'index.js'
    },
    'angular2-apollo': {
        defaultExtension: 'js',
        main: 'index.js'
    },
    'apollo-client': {
        defaultExtension: 'js',
        main: 'index.js'
    },
    'graphql': {
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
    'lodash.omit': {
        defaultExtension: 'js',
        main: 'index.js'
    },
};
var materialPkgs = [
    'core',
    'button',
    'card',
    'toolbar',
    'input'
];
materialPkgs.forEach(function (pkg) {
    packages[("@angular2-material/" + pkg)] = { main: pkg + ".js" };
});
[
    'assign',
    'countby',
    'clonedeep',
    'flatten',
    'forin',
    'forown',
    'has',
    'identity',
    'includes',
    'isarray',
    'isequal',
    'isnull',
    'isnumber',
    'isobject',
    'isstring',
    'isundefined',
    'keys',
    'keysin',
    'mapvalues',
    'pick',
    'rest',
    '_baseclone',
    '_baseeach',
    '_baseflatten',
    '_basefor',
    '_baseiteratee',
    '_basetostring',
    '_stringtopath',
    '_root'
].forEach(function (name) {
    var pkg = "lodash." + name;
    map[pkg] = "vendor/" + pkg;
    packages[pkg] = {
        defaultExtension: 'js',
        main: 'index.js'
    };
});
var barrels = [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'rxjs',
    'app',
    'app/shared',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
System.config({ map: map, packages: packages });
