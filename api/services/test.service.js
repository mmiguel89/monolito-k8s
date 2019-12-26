"use strict";

const os = require('os');

module.exports = {
	name: "test",

	/**
	 * Service settings
	 */
	settings: {
	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Echo
		 *
		 * @returns
		 */
		async ping() {
			return os.networkInterfaces().eth0[0];
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};