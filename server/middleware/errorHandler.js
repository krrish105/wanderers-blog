import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
	let CustomError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong, try again later",
	};

	if (err.name === "ValidationError") {
		CustomError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(",");
		CustomError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.code && err.code === 11000) {
		CustomError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field, please choose another value`;
		CustomError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.name === "CastError") {
		CustomError.msg = `No item found with id : ${err.value}`;
		CustomError.statusCode = StatusCodes.NOT_FOUND;
	}

	return res.status(CustomError.statusCode).json({ msg: CustomError.msg });
};

export default errorHandler;
