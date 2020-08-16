import * as CryptoJS from "crypto-js";
import { environment } from "src/environments/environment";

export class Crypto {
  public encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data.trim(), environment.key.trim()).toString();
  }

  public decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, environment.key.trim());
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
  }
}
