import server from "./server";
import { toHex } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";


function Wallet({ privateKey, setPrivateKey, address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const address = toHex(secp.secp256k1.getPublicKey(privateKey));
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
      <label>
        Address : {address.slice(0,20)+'...'}
        {/* <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input> */}
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
