const bip39 = require('bip39')
const slip39 = require('slip39/src/slip39.js')
const uuidv4 = require('uuid/v4')

//const masterSecret = 'ABCDEFGHIJKLMNOP'.encodeHex();

const generatePartsFor = (seedWords, { required, total }) => {
	const identifier = uuidv4()
	console.log('random seed', bip39.generateMnemonic())

	console.log('\n\n--- GENERATING PARTS FROM SEED WORDS ---\n')
	console.log('generating for seed:\n', seedWords)

	const entropy = bip39.mnemonicToEntropy(seedWords)
	console.log('entropy', entropy)
	const masterSecret = entropy.encodeHex()

	console.log('masterSecret', masterSecret)

	const slip = slip39.fromArray(masterSecret, {
		passphrase: '',
		threshold: 1,
		groups: [[required, total], [1, 1], [4, 5]],
	})

	const parts = slip.fromPath('r/0').mnemonics

	console.log(slip.fromPath('r/0').mnemonics)
	console.log(slip.fromPath('r/1').mnemonics)
	console.log(slip.fromPath('r/2').mnemonics)

	//console.log('generated parts\n', parts);

	return {
		parts,
	}
}

const recoverSecretFromParts = (parts, passphrase = '') => {
	console.log('\n\n--- RECOVERING SECRET FROM PARTS ---\n')

	console.log('parts\n', parts)

	const recoveredSecret = slip39.recoverSecret(parts, passphrase)
	console.log('master secret', recoveredSecret)
	const entropy = recoveredSecret.decodeHex()
	console.log('Recovered entropy:\n' + entropy)

	const seedWords = bip39.entropyToMnemonic(entropy)
	console.log('recovered seed:\n', seedWords)

	return seedWords
}

module.exports = {
	generatePartsFor,
	recoverSecretFromParts,
}
