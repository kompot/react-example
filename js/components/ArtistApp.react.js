/**
 * @jsx React.DOM
 */

var Header = require('./LibraryHeader.react');
var LibraryMainSection = require('./LibraryMainSection.react');
var React = require('react');
var ArtistStore = require('../stores/ArtistStore');

function getState() {
  return {
    allItems: ArtistStore.getAll()
  };
}

var ArtistApp = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    ArtistStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ArtistStore.removeChangeListener(this._onChange);
  },

  render: function() {
  	return (
      <div>
        <Header entity="artist" title="Artists" />
        <LibraryMainSection
          entity="artist"
          allItems={this.state.allItems}
        />
      </div>
  	);
  },

  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = ArtistApp;
