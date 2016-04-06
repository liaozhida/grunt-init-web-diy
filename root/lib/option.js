'use strict';

var filter = require('util-format');
var log4js = require('log4js');
var ejs = require('ejs');
{% if(mongo){ %}
var mongo = require('kraken-util/lib/mongo');
{% } %}
{% if(redis){ %}
var redis = require('kraken-util/lib/redis');
{% } %}
{% if(restify){ %}
var rest = require('util-restify');
{% } %}

for (var k in filter) {
	ejs.filters[k] = filter[k];
}

module.exports = function spec() {

	return {
		onconfig: function(config, next) {
			log4js.configure(config.get('log4jsConfig'), {});
			{% if(mongo){ %}
			mongo.config(config.get('mongoConfig'));
			{% } %}
			{% if(redis){ %}
			redis.config(config.get('redisConfig'));
			{% } %}
			{% if(restify){ %}
			rest.config(config.get('restifyConfig'));
			{% } %}
			next(null, config);
		}
	};
};