import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { generateCookiesToken, createTokenUser } from "../utils/index.js";

const register = async (req, res) => {
	console.log(req.body);
	const { name, email, password } = req.body;

	let isUser = await User.find({ email });
	if (isUser.length > 0) {
		// Open a modal where it's shown that the user is already registered,
		// give them a back to login and forgot password button
		throw new BadRequestError("Already an user.");
	}

	const user = await User.create({ name, email, password });
	const tokenUser = createTokenUser(user);
	generateCookiesToken({ res, payload: tokenUser });
	res.status(StatusCodes.CREATED).json({ msg: "Registered", tokenUser });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email) {
		throw new BadRequestError("Please provide an email");
	}
	if (!password) {
		throw new BadRequestError("Please provide a password");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credentials");
	}

	const tokenUser = createTokenUser(user);
	generateCookiesToken({ res, payload: tokenUser });
	res.status(StatusCodes.OK).json({ msg: "Logged In", tokenUser });
};

const logout = (req, res) => {
	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
		secure: process.env.NODE_ENV === "production",
		signed: true,
	});
	res.status(StatusCodes.OK).send("logout");
};

const resetPassword = async (req, res) => {
	const { email, oldPassword, newPassword } = req.body;

	if (!email) {
		throw new BadRequestError("Please provide an email");
	}
	if (!oldPassword) {
		throw new BadRequestError("Please provide the old password");
	}
	if (!newPassword) {
		throw new BadRequestError("Please provide the new password");
	}

	let reqUserID = req.user.userID;
	let user = await User.findById(reqUserID);
	if (user.email !== email) {
		throw new BadRequestError("Provide the registered email");
	}
	let isOldPassCorrect = await user.comparePassword(oldPassword);
	if (!isOldPassCorrect) {
		throw new BadRequestError("Old password is not valid");
	}
	user.password = newPassword;
	await user.save();
	res.status(StatusCodes.OK).json({ msg: "Password updated" });
};

const isLoggedIn = (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};

export { register, login, logout, resetPassword, isLoggedIn };
