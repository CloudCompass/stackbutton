var https = require('https');
var github = require('octonode');


module.exports = {

  getAccount: function (serviceID, cb) {
    sails.log.debug('finding service:', serviceID);
    Service.findOne({id: serviceID})
      .exec(function (err, res) {
        if (res) {
          var client = github.client(res.token);
          var ghme = client.me();
          ghme.info(cb);
        } else {
          sails.log.error('could not retrieve account', err);
        }
      });
  },

  getRepos: function (serviceID, cb) {
    sails.log.debug('finding service:', serviceID);
    Service.findOne({id: serviceID})
      .exec(function (err, res) {
        if (res) {
          var client = github.client(res.token);
          var ghme = client.me();
          ghme.repos(cb);
        } else {
          sails.log.error('could not retrieve repos', err);
        }
      });
  },

  getCommits: function (widgetId, cb) {
    sails.log.debug('finding widget:', widgetId);
    Widget.findOne({id: widgetId}).populate('modules')
      .exec(function (err, widget) {
        if (widget) {
          sails.log.debug('finding first module:', widget.modules);
          Module.findOne({id: widget.modules[0].id}).populate('service')
            .exec(function (err, module) {
              if (module) {
                var client = github.client(module.service.token);
                var ghrepo = client.repo(module.config.repoFullName);
                ghrepo.commits(cb);
              } else {
                sails.log.error('could not retrieve module', err);
              }
            });
        } else {
          sails.log.error('could not retrieve widget', err);
        }
      });
  },

  //TODO convert to github wrapper
  validateToken: function (token, cb) {
    var options = {
      hostname: 'api.github.com',
      path: '/user',
      method: 'GET',
      headers: {
        'Authorization': 'token ' + token,
        'User-Agent': 'StackButton'
      }
    };
    var data;
    var request = https.request(options, function (response) {
      var buffer = "", data;
      response.on("data", function (chunk) {
        buffer += chunk;
      });
      response.on("end", function (err) {
        // finished transferring data
        data = JSON.parse(buffer);
        if (response.statusCode == 200) {
          cb();
        } else {
          cb(new Error(data.message));
        }
      });
    });
    request.on('error', function (err) {
      sails.log.error('validateToken():', err);
      cb(err)
    });
    request.end();
  }
};
/**
 * Created by tiffa on 2016-05-06.
 */
