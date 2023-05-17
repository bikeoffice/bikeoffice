import { User, sequelize } from "@bikeoffice/types";
import CryptoJS from 'crypto-js';


async function validateUser(username: string, password: string): Promise<string> {
  try {
    const user = await User.findOne({ where: { username, password } });
    return user ? crypt({ id: user.dataValues.id, schema: user.dataValues.schema }) : null;
  } catch (e: any) {
    throw new Error("Internal server error");
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function _checkSchemaExists(schemaName: string) {
  const schemas = await sequelize.getQueryInterface().showAllSchemas();
  return Array.from(schemas as string[]).includes(schemaName);
}

// cookie encryption stuff
const secret = 'Sh1_m4N-0';
const prefix = 'BO';

function crypt(obj: any): string {
  const encrypted = CryptoJS.AES.encrypt(prefix + JSON.stringify(obj), secret).toString();
  return encrypted;
}

function decrypt(encryptedText: string): string {
  const decryptedText: string = CryptoJS.AES.decrypt(encryptedText, secret).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedText.slice(2)); 
}

export { validateUser, decrypt }
