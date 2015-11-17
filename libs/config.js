'use strict';

/*
	Configurations
 */

require('dotenv').load();

module.exports = {
	port: Number(process.env.PORT) || 8080
};
