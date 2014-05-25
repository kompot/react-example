/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var LibraryActions = require('../actions/LibraryActions');
var TextInput = require('./TextInput.react');

var LibraryHeader = React.createClass({
  propTypes: {
    entity: ReactPropTypes.string.isRequired,
    title: ReactPropTypes.string.isRequired
  },
  render: function() {
    return (
      <header id="header">
        <h1>{ this.props.title }</h1>
        <TextInput
          id="new-item"
          placeholder="Name"
          onSave={this._onSave}
        />
      </header>
    );
  },
  _onSave: function(name) {
    LibraryActions.create(this.props.entity, name);
  }
});

module.exports = LibraryHeader;
