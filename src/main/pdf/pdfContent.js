const getTemplatePdfContent = ({ requiredPartsT, uniquePartsN }) => {
	const pageBreak = { pageBreak: 'before' }
	const date = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	const allContent = Array.from(Array(uniquePartsN).keys()).reduce(
		(accumulator, index) => {
			return [
				...accumulator,
				...[
					{
						text: 'Wallet Seed Backup',
						style: 'title',
						...(index ? pageBreak : {}),
					},
					{
						text: [
							'This paper is part of a cryptocurrency wallet seed backup, generated on ',
							{ text: date, bold: true },
							' by ',
							{ text: 'Björn Schröder', bold: true },
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
														text:
															'after validating',
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

	console.log(allContent)

	return allContent
}

const getSharePdfContent = share => {
	return [
		{
			text: 'Wallet\nSeed\nBackup',
			style: 'title',
		},
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
		{
			text: 'Subheader 1 - using subheader style',
			style: 'subheader',
		},
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
		`SHARE -> ${share} <-.\n\n`,
	]
}

module.exports = {
	getTemplatePdfContent,
	getSharePdfContent,
}
