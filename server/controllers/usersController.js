import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import User from "../models/userModel.js";
import { createTokenUser, generateCookiesToken } from "../utils/index.js";

const getUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findById(id).select("-password");
	if (!user) {
		throw new BadRequestError("No user found");
	}
	res.status(StatusCodes.OK).json(user);
};

const editUser = async (req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;

	if (!name) {
		throw new BadRequestError("Please provide a name");
	}
	if (!email) {
		throw new BadRequestError("Please provide an email");
	}

	const user = await User.findByIdAndUpdate(
		id,
		{ name, email },
		{ new: true, runValidators: true }
	);
	if (!user) {
		throw new BadRequestError("No user found");
	}
	await user.save();

	const tokenUser = createTokenUser(user);
	generateCookiesToken({ res, payload: tokenUser });
	res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Will delete all the blogs of that user also, all the details of that user
const deleteUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findByIdAndDelete(id);
	if (!user) {
		throw new BadRequestError("No user found");
	}
	res.cookie("token", "deleted", {
		httpOnly: true,
		expires: new Date(Date.now()),
		secure: process.env.NODE_ENV === "production",
		signed: true,
	});
	res.status(StatusCodes.GONE).json({ msg: "Account Deleted" });
};

export { getUser, editUser, deleteUser };
