import { User } from "@bikeoffice/types";
import CryptoJS from "crypto-js";

// cookie encryption stuff
const secret = "Sh1_m4N-0";
const prefix = "BO";

export function crypt(obj: any): string {
	return CryptoJS.AES.encrypt(prefix + JSON.stringify(obj), secret).toString();
}

export function decrypt(encryptedText: string): string {
	const decryptedText: string = CryptoJS.AES.decrypt(encryptedText, secret).toString(CryptoJS.enc.Utf8);
	return JSON.parse(decryptedText.slice(2));
}

export const AuthService = {} as any;

const validateUser = async (username: string, password: string) => {
	try {
		const user = await User.findOne({ where: { username, password } });
		if (user) {
			const { id, schema } = user.dataValues;
			const cookie = crypt({ id, schema });
			return { user, cookie };
		}
	} catch (error) {
		return false;
	}
};

AuthService.login = async (req: any, res: any) => {
	const { username, password } = req.body;
	const userInfo = await validateUser(username, password);

	if (userInfo) {
		const { user, cookie } = userInfo;
		const { logo, address, city, tel, code, website } = user.dataValues;
		const responseData = { logo, address, city, tel, code, website };

		res.cookie("plato", cookie, {
			maxAge: 9000000000000,
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		}).json(responseData);
	} else {
		res.status(401).json({ error: "Invalid credentials" });
	}
};
