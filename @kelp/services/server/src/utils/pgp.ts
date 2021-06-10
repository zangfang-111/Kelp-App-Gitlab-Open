import {
  decrypt as pgpDecrypt,
  encrypt as pgpEncrypt,
  enums,
  generateKey,
  initWorker,
  key,
  message as pgpMessage,
  sign as pgpSign,
} from 'openpgp'

interface KeyPairInput {
  email: string
  name: string
  passphrase: string
}

export interface KeyReturnPayload {
  key: key.Key
  privateKeyArmored: string
  publicKeyArmored: string
  revocationCertificate: string
}

export type ECCCurve =
  | 'ed25519'
  | 'curve25519'
  | 'p256'
  | 'p384'
  | 'p521'
  | 'secp256k1'
  | 'brainpoolP256r1'
  | 'brainpoolP384r'
  | 'brainpoolP512r1'

/**
 * Wrapper for Key generation
 * @param KeyPairInput
 * @param curve elliptic curve for ECC keys: elliptic curve for ECC keys: `'ed25519'
  | 'curve25519'
  | 'p256'
  | 'p384'
  | 'p521'
  | 'secp256k1'
  | 'brainpoolP256r1'
  | 'brainpoolP384r'
  | 'brainpoolP512r1'`.
 * @returns Promise<KeyReturnPayload>
 */
export async function generateECCKeyPair(
  { name, email, passphrase }: KeyPairInput,
  curve: ECCCurve = 'ed25519',
): Promise<KeyReturnPayload> {
  const options = {
    userIds: [{ name, email }], // multiple user IDs
    curve, // ECC curve name
    passphrase, // protects the private key
  }
  return await generateKey(options)
}

/**
 * OpenPGP encrypt wrapper
 * @param message
 * @param pubKey
 * @param compression
 */
export async function encrypt(
  message: string,
  pubKey: string,
  compression = enums.compression.zlib | 0,
): Promise<string> {
  initWorker({ path: 'openpgp.worker.js' }) // set the relative web worker path

  const options = {
    message: pgpMessage.fromText(message), // input as Message object
    publicKeys: (await key.readArmored(pubKey)).keys, // for encryption
    compression,
  }

  const enc = await pgpEncrypt(options)

  return enc.data as string
}
/**
 * OpenPGP sign wrapper
 * @param message
 * @param privKey
 * @param passphrase
 */
export async function sign(message: string, privKey: string, passphrase: string): Promise<string> {
  initWorker({ path: 'openpgp.worker.js' }) // set the relative web worker path
  const privKeyObj = (await key.readArmored(privKey)).keys[0]
  await privKeyObj.decrypt(passphrase)

  const options = {
    message: pgpMessage.fromText(message), // input as Message object
    privateKeys: [privKeyObj], // for signing (optional)
  }

  const signed = await pgpSign(options)
  return signed.data as string
}
/**
 * OpenPGP decrypt wrapper
 * @param message
 * @param privKey
 * @param passphrase
 */
export async function decrypt(
  message: string,
  privateKeyArmored: string,
  passphrase: string,
  publicKeyArmored?: string,
): Promise<string> {
  initWorker({ path: 'openpgp.worker.js' }) // set the relative web worker path

  const privKeyObj = (await key.readArmored(privateKeyArmored)).keys[0]
  await privKeyObj.decrypt(passphrase)

  const options = {
    message: await pgpMessage.readArmored(message), // parse armored message
    publicKeys: (await key.readArmored(publicKeyArmored)).keys, // for verification (optional)
    privateKeys: [privKeyObj], // for decryption
  }

  const decrypted = await pgpDecrypt(options)
  return decrypted.data as string
}
