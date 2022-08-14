import { Router } from "express";
const router = Router();
import authenticateUser from "../middleware/authentication.js";
import {
	getAllBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
} from "../controllers/blogsController.js";

router.route("/").get(getAllBlogs);
router.route("/create").post(authenticateUser, createBlog);
router
	.route("/:id")
	.get(getBlog)
	.patch(authenticateUser, updateBlog)
	.delete(authenticateUser, deleteBlog);

// except getALlBlogs, all other methods require authentication
export default router;
