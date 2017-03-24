var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  save:function(name,value){
    localStorage.setItem(name,value)
  }
});

