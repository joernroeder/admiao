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
	pageMargins: [70, 70, 100, 100],
}

const options = {
	// ...
}

// --- storage ---

const pdfStorage = new Map()

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
			content: getSharePdfContent(share),
		},
		options
	)

	/*
	if (useManagedDisks) {

	}
	else {
		const pdfPath = `./pdf-shares/${identifier}-share-${index + 1}.pdf`;

		pdfDoc.pipe(fs.createWriteStream(pdfPath));
		pdfDoc.end();

		return pdfPath;
	}*/

	return {
		meta: {
			identifier,
			index,
			fileName: `${identifier}-share-${index + 1}.pdf`,
			fileId: uuidv4(),
			settings,
		},
		document: pdfDoc,
	}
}

const generateSharePdfs = (data, settings) => {
	const exportIdentifier = uuidv4()
	/*
    const identifier = crypto
        .createHash('sha256')
        .update(JSON.stringify(data))
        .digest('hex');
    */

	console.log('data --->', data)
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

		console.log({ meta, document })

		if (!document) {
			return resolve(false)
		}

		const { fileName } = meta

		document.pipe(fs.createWriteStream(path.join(pathToSaveTo, fileName)))
		document.on('end', () => {
			pdfStorage.delete(meta)
			resolve(true)
		})

		document.end()
	})
}

// --- Generated PDfs Storage ---

const saveSharePdfsToFileSystem = (savePdfsTo, identifier) => {
	console.log('todo: saving to fs', savePdfsTo, identifier)
	if (!savePdfsTo || !fs.existsSync(savePdfsTo)) {
		throw new Error(
			!savePdfsTo
				? 'No directory selected'
				: 'Selected directory does not exist.'
		)
	}

	for (const [meta, document] of pdfStorage) {
		if (meta.identifier !== identifier) {
			console.warn('file with different identifier found', meta)
			continue
		}

		const { fileName } = meta

		//const pdfPath = `./pdf-shares/${fileName}`;
		const pdfPath = path.join(savePdfsTo, fileName)

		document.pipe(fs.createWriteStream(pdfPath))
		document.end()

		pdfStorage.delete(meta)
	}

	console.log('pdfStorage.size', pdfStorage.size)

	return { identifier, pendingDocuments: pdfStorage.size }
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
