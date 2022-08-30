import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
const { isEmail } = validator;
import bcryptjs from "bcryptjs";
const { genSalt, hash, compare } = bcryptjs;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a name"],
			minlength: 3,
			maxlength: 50,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please provide an email"],
			validate: {
				validator: isEmail,
				message: "Please provide a valid email",
			},
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: 8,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		avatar: {
			type: String,
		},
		verificationToken: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
		verified: Date,
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("blogs", {
	ref: "Blog",
	localField: "_id",
	foreignField: "author",
	justOne: false,
});

UserSchema.pre("save", async function () {
	// This below method will return the modified properties in the document
	if (this.isModified("password")) {
		const salt = await genSalt(10);
		this.password = await hash(this.password, salt);
	}
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await compare(candidatePassword, this.password);
	return isMatch;
};

export default model("User", UserSchema);

// July month: 20000 - 6000 - 224 - 349
// June month: 4304-2000
