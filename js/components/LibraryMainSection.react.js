/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var LibraryActions = require('../actions/LibraryActions');
var DataRow = require('./DataRow.react');

var LibraryMainSection = React.createClass({

  propTypes: {
    entity: ReactPropTypes.string.isRequired,
    allItems: ReactPropTypes.object.isRequired
  },

  render: function() {
    if (Object.keys(this.props.allItems).length < 1) {
      return <noscript />;
    }

    var allItems = this.props.allItems;
    var items = [];

    for (var key in allItems) {
      items.push(<DataRow key={key} entity={this.props.entity} item={allItems[key]} />);
    }

    return (
      <table border="1">
        <thead><tr><th>Name</th></tr></thead>
        {items}
      </table>
    );
  }

});

module.exports = LibraryMainSection;
