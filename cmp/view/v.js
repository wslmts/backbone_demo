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
    this.collection = new SampleCollection();
    this.model = new SampleModel();
    this.model.on('change', this.updateView, this);
    this.collection.on('add', this.updateList, this);
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
    this.collection.add({name:value});
    console.log('c',this.collection)
  },
  events: {
    'change .input': 'inputChanged'
  },
  inputChanged: function (e) {
    this.model.set('raw', e.target.value);
  },
  updateList: function () {
    var str=[];
    console.log('l',this.collection.toJSON())
   if(this.collection.models.length>0){
     this.collection.models.forEach(function(v,i){
         str.push('<li>'+ v.get("name")+'</li>');
     });
     Backbone.$(".list").html(str.join(""))
   }
  },
  render: function () {
    this.el.innerHTML = Mustache.to_html(this.template, this.viewModel);
  }
});
