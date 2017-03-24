var Backbone = require('backbone');
var Mustache = require('mustache');
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/templates/sample.mu', { encoding: 'utf8' });
var SampleModel = require('../model/m.js');
var SampleCollection = require('../collection/c.js');

module.exports = Backbone.View.extend({
  el: '.view',
  template: template,
  initialize: function () {
    this.model = new SampleModel();
    this.model.on('change', this.updateView, this);
    this.model.set('raw', 'mary,green');
  },
  updateView: function () {
    var name=this.model.get('raw').split(',')[0];
    var value=this.model.get('raw').split(',')[1];
    this.viewModel = {
       name:name,
       value:value
    };
    this.render();
    this.model.save(name,value);
  },
  events: {
    'change .input': 'inputChanged'
  },
  inputChanged: function (e) {
    this.model.set('raw', e.target.value);
  },
  render: function () {
    this.el.innerHTML = Mustache.to_html(this.template, this.viewModel);
  }
});
