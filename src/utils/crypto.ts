// import CryptoJS from "crypto-js";
//
// // 管理系统 AES密钥 , AES向量
// const manageAes = { key: "", iv: "" };
// // 用户登录 AES密钥 , AES向量
// const loginAes = { key: "b9049bb512f6b776835b9bf9e6c44c45", iv: "47e2cf4f8ee69fd9d7f3cad475682df8" };
//
// /**
//  * AES加密，返回Base64编码
//  */
// const aesEncrypt = (str: string, aesKey: string, aesIv: string) => {
//   const encrypted = CryptoJS.AES.encrypt(str, CryptoJS.enc.Hex.parse(aesKey), {
//     iv: CryptoJS.enc.Hex.parse(aesIv),
//     // mode: CryptoJS.mode.CBC,
//     // padding: CryptoJS.pad.Pkcs7,
//   });
//   return encrypted.toString();
// }
//
// /**
//  * AES解密,参数Base64编码
//  */
// const aesDecrypt = (str: string, aesKey: string, aesIv: string) => {
//   const decrypted = CryptoJS.AES.decrypt(str, CryptoJS.enc.Hex.parse(aesKey), {
//     iv: CryptoJS.enc.Hex.parse(aesIv),
//     // mode: CryptoJS.mode.CBC,
//     // padding: CryptoJS.pad.Pkcs7,
//   });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }
//
// /**
//  * 管理系统AES加密
//  */
// export function manageEncrypt(str: string) {
//   return aesEncrypt(str, manageAes.key, manageAes.iv);
// }
//
// /**
//  * 管理系统AES解密
//  */
// export function manageDecrypt(str: string) {
//   return aesDecrypt(str, manageAes.key, manageAes.iv);
// }
//
// /**
//  * 用户登录AES加密
//  */
// export function loginEncrypt(str: string) {
//   return aesEncrypt(str, loginAes.key, loginAes.iv);
// }
//
// /**
//  * 用户登录AES解密
//  */
// export function loginDecrypt(str: string) {
//   return aesDecrypt(str, loginAes.key, loginAes.iv);
// }
