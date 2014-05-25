/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var LibraryActions = require('../actions/LibraryActions');
var TextInput = require('./TextInput.react');

var DataRow = React.createClass({

  propTypes: {
   entity: ReactPropTypes.string.isRequired,
   item: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return { };
  },

  render: function() {
    var item = this.props.item;
    return (
      <tr key={item.id}>
        <td>{item.data.name}</td>
      </tr>
    );
  }

});

module.exports = DataRow;
