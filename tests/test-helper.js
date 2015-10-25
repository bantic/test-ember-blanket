/* global QUnit */
import resolver from './helpers/resolver';
import Pretender from 'pretender';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

var server;
var usePretender = false;
var usePassthrough = false;
QUnit.begin(function() {
  console.log('begin tests');

  if (usePretender) {
    console.log('using pretender');
    server = new Pretender(function() {
      if (usePassthrough) {
        this.post('/write-blanket-coverage', this.passthrough);
      } else {
        console.log('NOT using passthrough');
      }
    });
    server.handledRequest = function(verb, path) {
      console.log('handled',verb,path);
    };
    server.unhandledRequest = function(verb, path) {
      console.log('UN handled',verb,path);
    };
    server.passthroughRequest = function(verb, path) {
      console.log('passed through',verb,path);
    };
  } else {
    console.log('not using pretender');
  }
});

QUnit.done(function() {
  console.log('end tests');
});
