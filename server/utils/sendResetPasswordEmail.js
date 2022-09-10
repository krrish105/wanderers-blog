import sendEmail from "./sendEmail.js";

const sendResetPasswordEmail = ({ name, email, token, origin }) => {
	const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
	const message = `<p>PLease reset your password by clicking on the following link : 
	<a href="${resetURL}" target="_blank">Reset Password</a></p>`;

	return sendEmail({
		to: email,
		subject: "Reset Password",
		html: `Hello, ${name}
		${message}`,
	});
};

export default sendResetPasswordEmail;
