/* jshint node: true */
'use strict';

/**
 * Include the jquery-simulate-ext library as a test dependency. Imports each
 * required file from the Bower directory.
 *
 * @param {Object} app	The Ember application instance
 */
function includeJquerySimulateExtForTests(app) {
  var jquerySimulateExtRoot = '/jquery-simulate-ext/';
  var jquerySimulateExtFiles = [
    "libs/bililiteRange.js",
    "libs/jquery.simulate.js",
    "src/jquery.simulate.ext.js",
    "src/jquery.simulate.drag-n-drop.js",
    "src/jquery.simulate.key-sequence.js",
    "src/jquery.simulate.key-combo.js"
  ];

  jquerySimulateExtFiles.forEach(function(fileName) {
    app.import(app.bowerDirectory + jquerySimulateExtRoot + fileName, {
      type: 'test'
    });
  });
}

module.exports = {
  name: 'ember-simple-draggable',
  included: function(app) {
    this._super.included(app);

    includeJquerySimulateExtForTests(app);
  }
};
