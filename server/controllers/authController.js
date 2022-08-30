import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import {
	attachCookiesToResponse,
	createTokenUser,
	sendVerificationEmail,
} from "../utils/index.js";
import { randomBytes } from "crypto";

const register = async (req, res) => {
	const { name, email, password } = req.body;

	let isUser = await User.find({ email });
	if (isUser.length > 0) {
		// Open a modal where it's shown that the user is already registered,
		// give them a back to login and forgot password button
		throw new BadRequestError("Already an user.");
	}

	const verificationToken = randomBytes(40).toString("hex");
	const user = await User.create({ name, email, password, verificationToken });

	const origin = "http://localhost:3000";
	await sendVerificationEmail({
		name: user.name,
		email: user.email,
		verificationToken: user.verificationToken,
		origin,
	});
	res.status(StatusCodes.CREATED).json({ status: "Registered" });
};

const verifyEmail = async (req, res) => {
	const { verificationToken, email } = req.body;
	if (!verificationToken || !email) {
		throw new CustomError.BadRequestError(
			"Please provide a verification token and email"
		);
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("verification failed");
	}
	if (user.verificationToken !== verificationToken) {
		throw new UnauthenticatedError("verification failed");
	}

	user.isVerified = true;
	user.verified = Date.now();
	user.verificationToken = "";
	await user.save();

	res.status(StatusCodes.OK).json({
		status: "Email verified",
	});
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

	if (!user.isVerified) {
		throw new UnauthenticatedError("Please verify your email");
	}

	const tokenUser = createTokenUser(user);
	let refreshToken = "";
	const existingToken = await Token.findOne({ user: user._id });
	if (existingToken) {
		const { isValid } = existingToken;
		if (!isValid) {
			throw new UnauthenticatedError("Invalid credentials");
		}
		refreshToken = existingToken.refreshToken;
	} else {
		refreshToken = randomBytes(40).toString("hex");
		const userAgent = req.headers["user-agent"];
		const ip = req.ip;
		const userToken = { refreshToken, ip, userAgent, user: user._id };
		await Token.create(userToken);
	}
	attachCookiesToResponse({ res, user: tokenUser, refreshToken });
	res.status(StatusCodes.OK).json({ status: "Logged In", tokenUser });
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
	console.log(email, oldPassword, newPassword);
	if (!email) {
		throw new BadRequestError("Please provide an email");
	}
	if (!oldPassword) {
		throw new BadRequestError("Please provide the old password");
	}
	if (!newPassword) {
		throw new BadRequestError("Please provide the new password");
	}

	let user = await User.findOne({ email });

	if (user.email !== email) {
		throw new BadRequestError("Provide the registered email");
	}
	let isOldPassCorrect = await user.comparePassword(oldPassword);
	if (!isOldPassCorrect) {
		throw new BadRequestError("Old password is not valid");
	}
	user.password = newPassword;
	await user.save();

	const tokenUser = createTokenUser(user);
	generateCookiesToken({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({ status: "Password updated", tokenUser });
};

const isLoggedIn = async (req, res) => {
	const { user } = req;

	let dbUser = user;
	if (user) {
		dbUser = await User.findById(user.userID).populate("blogs");
		if (!dbUser) {
			throw new BadRequestError("No user found");
		}
	}

	res.status(StatusCodes.OK).json({ user: dbUser });
};

export { register, login, logout, resetPassword, isLoggedIn, verifyEmail };
