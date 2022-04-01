const { OSS_KEY, OSS_SECRET } = process.env;

/**
 * OSS 访问密钥
 */
const ossSecretConfig = {
  accessKeyId: OSS_KEY ?? '',
  accessKeySecret: OSS_SECRET ?? '',
};

export { ossSecretConfig };
