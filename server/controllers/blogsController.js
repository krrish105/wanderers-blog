import { BadRequestError } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";
import Blogs from "../models/blogModel.js";
import { StatusCodes } from "http-status-codes";

const getAllBlogs = async (req, res) => {
	const blogs = await Blogs.find({});
	if (blogs.length < 1) {
		return res.status(StatusCodes.OK).json({
			status: "error",
			data: [],
			length: 0,
		});
	}
	res.status(StatusCodes.OK).json({
		status: "success",
		data: blogs,
		length: blogs.length,
	});
};

// =========== Will be shown to only logged in users ===========
// Will be shown through myblogs page, user profile page
const createBlog = (req, res) => {
	const { title, locationName, blogDesc } = req.body;
	if (!title || !locationName || !blogDesc) {
		throw new BadRequestError("Please provide a title, location name and blog");
	}
	let userID = req.user.userID;

	res.send("Create blogs");
};

// Will show the blog on a new page, will be shown when read more button is clicked on a blog tile
const getBlog = (req, res) => {};

// ========  Will be shown through the my blogs and user profile page =======
const updateBlog = (req, res) => {
	res.json({ user: req.user });
};

const deleteBlog = (req, res) => {
	res.send("Delete blog");
};

export { getAllBlogs, createBlog, getBlog, updateBlog, deleteBlog };
