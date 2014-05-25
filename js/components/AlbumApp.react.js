/**
 * @jsx React.DOM
 */

var Header = require('./LibraryHeader.react');
var LibraryMainSection = require('./LibraryMainSection.react');
var React = require('react');
var AlbumStore = require('../stores/AlbumStore');

function getState() {
  return {
    allItems: AlbumStore.getAll()
  };
}

var AlbumApp = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    AlbumStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AlbumStore.removeChangeListener(this._onChange);
  },

  render: function() {
  	return (
      <div>
        <Header entity="album" title="Albums" />
        <LibraryMainSection
          entity="album"
          allItems={this.state.allItems}
        />
      </div>
  	);
  },

  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = AlbumApp;
