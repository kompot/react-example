var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LibraryConstants = require('../constants/LibraryConstants');
var BackendDataService = require('./BackendDataService');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _items = {};

var _ent = 'album';

BackendDataService.getAll(_ent, LibraryConstants.LOAD_ALL_COMPLETED);

function create(entity, name) {
  var id = Date.now();
  BackendDataService.create(entity, { "name": name }, id);
  _items[id] = {
    id: id,
    data: { name: name }
  };
}

function update(id, updates) {
  _items[id] = merge(_items[id], updates);
}

function updateAll(updates) {
  for (var id in _items) {
    update(id, updates);
  }
}

var ArtistStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return _items;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;
  var text;

  if (action.entity === _ent) {
    switch (action.actionType) {
      case LibraryConstants.CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(action.entity, text);
        }
        break;

      case LibraryConstants.LOAD_ALL_COMPLETED:
        _items = payload.action.data;
        updateAll({});
        break;

      default:
        return true;
    }

    ArtistStore.emitChange();
  }

  return true;
});

module.exports = ArtistStore;
