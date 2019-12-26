"use strict";
const { ErrorHandler, BadRequestError, UnAuthorizedError } = require("../exeptions/errors");
const _ = require("lodash");
const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,
		
		cors: {
			origin: "*",
			methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
			allowedHeaders: ["Content-Type", "Accept", "X-Requested-With", "Authorization"],
			exposedHeaders: [],
			credentials: false,
			maxAge: 3600
		},
		routes: [
			{
				path: "/api",

				authorization: true,
				
				aliases: {

					// echo
					"GET /test": "test.ping"
				},

				// Disable to call not-mapped actions
				mappingPolicy: "restrict",

				// Set CORS headers
				cors: true,

				// Parse body content
				bodyParsers: {
					json: {
						limit: "10MB"
					},
					urlencoded: {
						extended: true,
						limit: "10MB"
					}
				}
			}
		],

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		},

		onError(req, res, err) {
			// Return with the error as JSON object
			res.setHeader("Content-type", "application/json; charset=utf-8");
			res.writeHead(err.code || 500);

			if (err.code == 422) {
				let o = {};
				err.data.forEach(e => {
					let field = e.field.split(".").pop();
					o[field] = e.message;
				});

				res.end(JSON.stringify({ errors: o }, null, 2));
			} else {
				const errObj = _.pick(err, ["name", "message", "code", "type", "data"]);
				res.end(JSON.stringify(errObj, null, 2));
			}
			this.logResponse(req, res, err ? err.ctx : null);
		}

	},
	methods: {
	}
};
