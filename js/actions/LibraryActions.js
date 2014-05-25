var AppDispatcher = require('../dispatcher/AppDispatcher');
var LibraryConstants = require('../constants/LibraryConstants');

var LibraryActions = {

  create: function(entity, text) {
    AppDispatcher.handleViewAction({
      actionType: LibraryConstants.CREATE,
      text: text,
      entity: entity
    });
  }

};

module.exports = LibraryActions;
