var AppDispatcher = require('../dispatcher/AppDispatcher');
var http = require('http');
var _ = require('lodash');

var BackendDataService = {
  getAll: function(entity, actionType, text) {
    var options = {
      host: 'react.kompot.name',
      port: 9200,
      path: '/library/' + entity + '/_search',
      method: 'POST'
    };

    var req = http.request(options, function(res) {
      var body = '';
      res.on("data", function(chunk) {
        body += chunk;
      });
      res.on("end", function() {
        var data = {};
        var r = JSON.parse(body);
        if (r.hits && r.hits.hits) {
          _.map(r.hits.hits, function (item) {
            data[item._id] = {
              id: item._id,
              data: item._source
            };
          });
          AppDispatcher.handleViewAction({
            actionType: actionType,
            entity: entity,
            text: text,
            data: data
          });
        }
      });
    });
    req.write(JSON.stringify({"sort" : [ {"_id" : {"order" : "asc" }} ]}));
    req.end();
  },
  create: function(entity, body, id) {
    var path = '/library/' + entity;
    if (id) {
      path += '/' + id;
    }
    if (id)
    var options = {
      host: 'react.kompot.name',
      port: 9200,
      path: path,
      method: 'POST'
    };
    var req = http.request(options, function(res) {
      res.on('data', function (chunk) {
      });
    });
    req.write(JSON.stringify(body));
    req.write('\n');
    req.end();
  },
  remove: function(entity, id) {
    var options = {
      host: 'react.kompot.name',
      port: 9200,
      path: '/library/' + entity + '/' + id,
      method: 'DELETE'
    };
    var req = http.request(options, function(res) {
      res.on("end", function() {
        AppDispatcher.handleViewAction({
          actionType: entity.toUpperCase() + "_DESTROYED",
          entity: entity
        });
      });
    });
    req.write('\n');
    req.end();
  }
};

module.exports = BackendDataService;
