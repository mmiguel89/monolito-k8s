"use strict";

const { MoleculerError, MoleculerClientError } = require("moleculer").Errors;

const ERR_NO_TOKEN = "NO_TOKEN";
const ERR_INVALID_TOKEN = "INVALID_TOKEN";
const ERR_UNABLE_DECODE_PARAM = "UNABLE_DECODE_PARAM";
const ERR_ORIGIN_NOT_FOUND = "ORIGIN_NOT_FOUND";
const ERR_ORIGIN_NOT_ALLOWED = "ORIGIN_NOT_ALLOWED";


const createResponse = (description, res, error) => {
	const message = {
		code: error.code,
		message: error.message,
		description: description
	};
	res.statusCode = error.code;
	res.end(JSON.stringify(message));
};

class ErrorHandler {
	/**
	 * Return the error to the client
	 * The response is built by a error instance as a parameter.
	 * The fields of the response are:
	 *  - code - Status code of the error instance pass as a parameter
	 *  - message - Message of the error instance pass as a parameter
	 *  - description - Messate of the error throwed and that is actually treated
	 * @param {*} res 
	 * @param {*} description 
	 * @param {*} error 
	 */
	static responseError(res, description, error) {
		createResponse(description, res, error);
	}
}

class InvalidRequestBodyError extends MoleculerError {
	constructor(body, error) {
		super("Invalid request body", 400, "INVALID_REQUEST_BODY", {
			body,
			error
		});
	}
}

class InvalidResponseTypeError extends MoleculerError {
	constructor(dataType) {
		super(`Invalid response type '${dataType}'`, 500, "INVALID_RESPONSE_TYPE", {
			dataType
		});
	}
}

class UnAuthorizedError extends MoleculerError {
	constructor(type, data) {
		super("Unauthorized", 401, type || ERR_INVALID_TOKEN, data);
	}
}

class ForbiddenError extends MoleculerError {
	constructor(type, data) {
		super("Forbidden", 403, type, data);
	}
}

class BadRequestError extends MoleculerError {
	constructor(type, data) {
		super("Bad request", 400, type, data);
	}
	
}

class NotFoundError extends MoleculerError {
	constructor(type, data) {
		super("Not found", 404, type || "NOT_FOUND", data);
	}
}

class RateLimitExceeded extends MoleculerClientError {
	constructor(type, data) {
		super("Rate limit exceeded", 429, type, data);
	}
}

class ServiceUnavailableError extends MoleculerError {
	constructor(type, data) {
		super("Service unavailable", 503, type, data);
	}
}

module.exports = {
	InvalidRequestBodyError,
	InvalidResponseTypeError,
	UnAuthorizedError,
	ForbiddenError,
	BadRequestError,
	NotFoundError,
	RateLimitExceeded,
	ServiceUnavailableError,
	ErrorHandler,

	ERR_NO_TOKEN,
	ERR_INVALID_TOKEN,
	ERR_UNABLE_DECODE_PARAM,
	ERR_ORIGIN_NOT_FOUND,
	ERR_ORIGIN_NOT_ALLOWED
};
