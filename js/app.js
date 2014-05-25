/**
 * @jsx React.DOM
 */

var React = require('react');

var AlbumApp = require('./components/AlbumApp.react');
var ArtistApp = require('./components/ArtistApp.react');

if (document.getElementById('albumComponent')) {
  React.renderComponent(
      <AlbumApp />,
      document.getElementById('albumComponent')
  );
}

if (document.getElementById('artistComponent')) {
  React.renderComponent(
      <ArtistApp />,
      document.getElementById('artistComponent')
  );
}
