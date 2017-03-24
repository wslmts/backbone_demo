var Backbone = require('backbone');
var ItemView = require('../view/v.js');
var listView = require('../view/list.js');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'root',
        'items': 'items',
        'items/:id': 'getItemById'
    },
    root: function () {
        this.navigate('items', { trigger: true });
    },
    items: function () {
        new ItemView();
    },
    getItemById: function (id) {
        new listView(id);
    }
});

