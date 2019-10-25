const { app, BrowserWindow, shell } = require('electron')
const PdfPrinter = require('pdfmake')
const path = require('path')
const fs = require('fs')
const uuidv4 = require('uuid/v4')

// --- pdf setup ---
const { styles, fonts } = require('./pdfStyles')
const permissions = require('./pdfPermissions')
const { getSharePdfContent, getTemplatePdfContent } = require('./pdfContent')

const printer = new PdfPrinter(fonts)

const docDefinition = {
	...styles,
	permissions,
}

const options = {
	// ...
}

const getFileName = ({ identifier, index }) => {
	return `${identifier}-share-${index + 1}.pdf`
}

// --- storage ---

const pdfStorage = new Map()

const getDocumentCountByIdentifier = identifier => {
	let counter = 0

	for (const [meta] of pdfStorage) {
		if (meta.identifier !== identifier) {
			continue
		}

		counter++
	}

	return counter
}

const getFirstFromStorage = identifier => {
	for (const [meta, document] of pdfStorage) {
		if (meta.identifier !== identifier) {
			continue
		}

		return [meta, document]
	}

	return [null, null]
}

// --- share generation ---

const generateSharePdf = (identifier, index, share, settings = {}) => {
	const pdfDoc = printer.createPdfKitDocument(
		{
			...docDefinition,
			content: getSharePdfContent({ ...settings, share }),
		},
		options
	)

	return {
		meta: {
			identifier,
			index,
			fileName: getFileName({ identifier, index }),
			fileId: uuidv4(),
			settings,
		},
		document: pdfDoc,
	}
}

const generateSharePdfs = (data, settings) => {
	const exportIdentifier = uuidv4()

	data.forEach((groupOrShare, index) => {
		if (typeof groupOrShare === 'string') {
			const { meta, document } = generateSharePdf(
				exportIdentifier,
				index,
				groupOrShare,
				settings
			)

			pdfStorage.set(meta, document)
		}
	})

	return exportIdentifier
}

// --- generate template ---

const generateTemplate = contentVars => {
	const identifier = uuidv4()
	const fileName = `${identifier}-template.pdf`

	const pdfDoc = printer.createPdfKitDocument(
		{
			...docDefinition,
			content: getTemplatePdfContent(contentVars),
		},
		options
	)

	pdfStorage.set(
		{
			identifier,
			fileName,
		},
		pdfDoc
	)

	return { identifier }
}

const removeTemplate = ({ identifier }) => {
	const [meta] = getFirstFromStorage(identifier)

	if (!meta) {
		return false
	}

	return pdfStorage.delete(meta)
}

const openTemplateInWindow = async ({ identifier }) => {
	return new Promise(resolve => {
		const [meta, document] = getFirstFromStorage(identifier)

		if (!document) {
			return resolve(false)
		}

		const { fileName } = meta
		const pdfPath = path.join(app.getPath('temp'), fileName)

		document.pipe(fs.createWriteStream(pdfPath))
		document.on('end', () => {
			pdfStorage.delete(meta)

			console.log('PDF Template path', pdfPath)
			setTimeout(function() {
				const opened = shell.openItem(pdfPath)
				resolve(opened)
			}, 1000)
		})

		document.end()
	})
}

const saveDocumentToPath = async (pathToSaveTo, identifier) => {
	return new Promise(resolve => {
		console.log(identifier)
		const [meta, document] = getFirstFromStorage(identifier)

		if (!document) {
			// todo unify api { copied: false }?
			return resolve(false)
		}

		const { fileName } = meta

		document.pipe(fs.createWriteStream(path.join(pathToSaveTo, fileName)))
		document.on('end', () => {
			pdfStorage.delete(meta)
			// todo unify api { copied: true }?
			resolve(true)
		})

		document.end()
	})
}

// --- Generated PDfs Storage ---

const saveSharePdfsToFileSystem = (savePdfsTo, identifier, options = {}) => {
	console.log('saving to fs', savePdfsTo, identifier, options)
	const { documentsToCopy = 0, uniqueDestination = false } = options

	if (!savePdfsTo || !fs.existsSync(savePdfsTo)) {
		const error = new Error(
			!savePdfsTo
				? 'No directory given'
				: `Given directory ${savePdfsTo} does not exist.`
		)
		error.code = 'NON_EXISTING_PATH'

		throw error
	}

	// check that no other files containing the given identifier are present at the
	// `savePdfsTo` destination path.
	/*
	 todo this could be optimized to do a glob savePdfsTo/**\/*.pdf search but i
	dont want to play a cat and mouse game here.
	 */
	if (uniqueDestination) {
		const containsFilesWithIdentifier = fs
			.readdirSync(savePdfsTo)
			.some(file => file.includes(identifier))

		if (containsFilesWithIdentifier) {
			const error = new Error(
				`Given path already contains files with the given identifier: ${identifier} ${savePdfsTo}`
			)
			error.code = 'REPEATED_DRIVE'

			throw error
		}
	}

	let copiedDocuments = 0

	for (const [meta, document] of pdfStorage) {
		if (meta.identifier !== identifier) {
			console.warn('file with different identifier found', meta)
			continue
		}

		// limit loop to passed in `documentsToCopy` param
		if (documentsToCopy > 0 && copiedDocuments === documentsToCopy) {
			break
		}

		const { fileName } = meta
		const pdfPath = path.join(savePdfsTo, fileName)

		// write pdf
		document.pipe(fs.createWriteStream(pdfPath))
		document.end()

		// remove from storage
		pdfStorage.delete(meta)

		copiedDocuments++
	}

	const pendingDocuments = getDocumentCountByIdentifier(identifier)

	return {
		identifier,
		pendingDocuments,
		copiedDocuments,
		savedToPath: savePdfsTo,
	}
}

module.exports = {
	generateSharePdf,
	generateSharePdfs,
	generateTemplate,
	removeTemplate,
	openTemplateInWindow,
	saveDocumentToPath,
	saveSharePdfsToFileSystem,
}
