const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/sha256');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');

// let publicKey=eth.generat

app.use(cors());
app.use(express.json());

const balances = {
  "03c3b3243e4c4b8c5494dd3abd7d72878385d6ee2f0eb743be1efe2ed806c8601e": 100, //3fca0a4b14a424644ce190b508efae3e121d055cb25e19eccce2a90328cf6c20
  "02724b015ca208c2fc6a8921686e7500a9d6481268b7322eb4828b114ced1aa2d1": 50, //77b9a7c37d6e7ede335ccd093e9eaf9eacfca1c1c63d68de1799d4999adc84de
  "03591b05add0ce037eb0d06ed6b051d72d71a2b8fa174393e17a13689bb218024c": 75, //651d5a2350e94935f5b3ece9c126942603e15ad5c086aff212ecd213edf1700f
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // const { sender, recipient, amount } = req.body;
  const { signature, recipient, amount } = req.body;

  let message = 'msg'
  let bytes = utf8ToBytes(message)
  let hash = keccak256(bytes)

  setInitialBalance(sender);
  setInitialBalance(recipient);
  // let address=secp.sha256.re
  recoveryBit = { recovered: true };
  let sender = secp.recoverPublicKey(toHex(hash), signature, recoveryBit);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
