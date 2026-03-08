import bs58 from "bs58";
import nacl from "tweetnacl";

export const verifySignature = (
  message: Uint8Array,
  signature: Uint8Array,
  publicKey: string
) => {

  const key = bs58.decode(publicKey);

  return nacl.sign.detached.verify(
    message,
    signature,
    key
  );

};