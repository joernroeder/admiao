const getCommonPdfContent = ({ requiredPartsT, uniquePartsN, index = 0 }) => {
	const today = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return [
		{
			text: 'Wallet Seed Backup',
			style: 'title',
			...(index ? { pageBreak: 'before' } : {}),
		},
		{
			text: [
				'This paper is part of a cryptocurrency wallet seed backup, generated on ',
				{ text: today, bold: true },
				//' by ',
				//{ text: 'Björn Schröder', bold: true },
				'. It follows the SLIP-0039 standard.',
			],
			style: 'body',
		},
		{
			text: [
				'In order to restore the seed from the backup you need ',
				{ text: `at least ${requiredPartsT}`, bold: true },
				' distributed parts like this one. All parts have the same first two words in common. Therefore they alone can be safely exchanged to find the other backup owners and validate the correctness of their parts.',
			],
			style: 'body',
		},
		{
			margin: [0, 0, 0, 64],
			table: {
				widths: ['*'],
				body: [
					[
						{
							fontSize: 10,
							fillColor: 'black',
							alignment: 'left',
							columns: [
								{
									text: [
										'No matter the circumstances, ',
										{
											text: 'always meet',
											decoration: 'underline',
										},
										' the other backup owners in person to exchange and combine the seed backups ',
										{
											text: 'after validating',
											decoration: 'underline',
										},
										' their identifier!\n' +
											'Do not send the followings words digitally! Scammers might be out there!',
									],
									style: ['body'],
									color: 'white',
									margin: 16,
								},
							],
						},
					],
				],
			},
		},
	]
}

const getTemplatePdfContent = ({ requiredPartsT, uniquePartsN }) => {
	return Array.from(Array(uniquePartsN).keys()).reduce(
		(accumulator, index) => {
			return [
				...accumulator,
				...[
					...getCommonPdfContent({
						requiredPartsT,
						uniquePartsN,
						index,
					}),
					{
						svg:
							'<svg height="61" viewBox="0 0 339 61" width="339" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#979797" stroke-linecap="square" transform="translate(1 -1)"><path d="m.49404811 21.5h336.03049089"/><path d="m.49404811 1.5h336.03049089"/><path d="m.49404811 41.5h336.03049089"/><path d="m.49404811 61.5h336.03049089"/></g></svg>',
						width: 442,
						margin: [95, 0, 0, 16],
					},
				],
			]
		},
		[]
	)
}

const getSharePdfContent = ({ requiredPartsT, uniquePartsN, share }) => {
	return [
		...getCommonPdfContent({ requiredPartsT, uniquePartsN }),
		{
			text: [{ text: share.replace(/\s/g, '   '), bold: true }],
			style: 'body',
		},
	]
}

module.exports = {
	getTemplatePdfContent,
	getSharePdfContent,
}
