var Backbone = require('backbone');
Backbone.$ = require('jquery');

var ViewRouter = require('./router/router.js');
new ViewRouter();

// wait on DOM ready: Backbone uses iframes in IE
// http://backbonejs.org/#History-start
Backbone.$(function () {
    Backbone.history.start();
});

