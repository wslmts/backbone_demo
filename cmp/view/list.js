var Backbone = require('backbone');
var Mustache = require('mustache');
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/templates/list.mu', { encoding: 'utf8' });
var SampleCollection = require('../collection/c.js');

module.exports = Backbone.View.extend({
  el: '.list',
  template: template,
  viewModel:{
      items:[]
  },
  initialize: function () {
    this.collection = new SampleCollection();
    this.collection.on('add', this.updateList, this);
    this.collection.add({name:'111'});
  },
  events: {
    'change .input': 'inputChanged'
  },
  inputChanged: function (e) {
      this.collection.add({name:e.target.value});
  },
  updateList: function () {
      var items=this.collection.models.map(function(v,i){
          return v.get('name');
      });
      this.viewModel={
          items:items
      }
      this.render();
  },
  render: function () {
    this.el.innerHTML = Mustache.to_html(this.template, this.viewModel);
  }
});
