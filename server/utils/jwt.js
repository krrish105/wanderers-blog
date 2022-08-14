import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

const createJWT = ({ payload }) => {
	return sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFESPAN,
	});
};

const verifyJWT = ({ token }) => verify(token, process.env.JWT_SECRET);

const generateCookiesToken = ({ res, payload }) => {
	const token = createJWT({ payload });
	const oneDay = 1000 * 60 * 60 * 24;
	res.cookie("token", token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === "production",
		signed: true,
		sameSite: false,
	});
};

export { createJWT, verifyJWT, generateCookiesToken };
