/* eslint-disable no-param-reassign */
import CryptoJS from 'crypto-js';

/**
 * @return {string}
 */
export function Encrypt(wordString, key, iv) {
  wordString = CryptoJS.enc.Utf8.parse(wordString);
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.DES.encrypt(wordString, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * @return {string}
 */
export function Decrypt(wordString, key, iv) {
  let encryptedHexStr = CryptoJS.enc.Base64.parse(wordString);
  wordString = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let decrypt = CryptoJS.DES.decrypt(wordString, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//Md5加密
export function MD5(string, key) {
  return CryptoJS.MD5(string + key).toString();
}
