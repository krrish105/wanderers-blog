import { UnauthenticatedError } from "../errors/index.js";
import { verifyJWT } from "../utils/index.js";

const authenticateUser = (req, res, next) => {
	const token = req.signedCookies.token;
	if (!token) {
		throw new UnauthenticatedError("Unauthenticated user");
	}
	try {
		const { userID } = verifyJWT({ token });
		req.user = { userID };
		next();
	} catch (error) {
		throw new UnauthenticatedError("Unauthenticated user");
	}
};

export default authenticateUser;
