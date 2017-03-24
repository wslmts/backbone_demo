var Backbone = require('backbone');
var SampleModel = require('../model/m.js');

module.exports = Backbone.Collection.extend({
  model: SampleModel
});
