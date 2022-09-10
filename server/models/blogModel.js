import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Please provide a title"],
			trim: true,
			minlength: 3,
		},
		// image: {
		// 	type: String,
		// 	required: [true, "Please provide a title"],
		// 	trim: true,
		// },
		locationName: {
			type: String,
			required: [true, "Please provide a location name"],
			trim: true,
			minlength: 3,
		},
		blogDesc: {
			type: String,
			required: [
				true,
				"Please provide the blog describing your travel experience",
			],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide the author name"],
		},
	},
	{ timestamps: true }
);

BlogSchema.index({ author: 1 }, { unique: true });

BlogSchema.post("remove", async function () {
	console.log("post remove hook");
});

export default model("Blog", BlogSchema);
