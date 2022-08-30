import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig.js";

const sendEmail = async ({ to, subject, html }) => {
	let testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport(nodemailerConfig);

	// send mail with defined transport object
	return transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to,
		subject,
		html,
	});
};

// const sendEmail = async (req, res) => {
// 	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// 	const msg = {
// 		to: "learncode@mail.com", // Change to your recipient
// 		from: "learncodetutorial@gmail.com", // Change to your verified sender
// 		subject: "Sending with SendGrid is Fun",
// 		text: "and easy to do anywhere, even with Node.js",
// 		html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// 	};
// 	const info = await sgMail.send(msg);
// 	res.json(info);
// };

export default sendEmail;
