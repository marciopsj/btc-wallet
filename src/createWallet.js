//Importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin =require('bitcoinjs-lib')

/*definir a rede

- Rede principal (Mainnet): bitcoin
- Rede de teste: testnet

*/
const network = bitcoin.networks.testnet


//Derivação de carteiras HD
//`m/49'/1'/0'/0` -> testnet
//`m/49'/0'/0'/0` -> mainnet
const path = `m/49'/1'/0'/0`

//Gerar a mnemonic que forma a seed (Palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criar a raiz da carteira determinística
let root = bip32.fromSeed(seed, network)

//Criar conta, par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

//Gerar um endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave Privada: ", node.toWIF())
console.log("Seed: ", mnemonic)


