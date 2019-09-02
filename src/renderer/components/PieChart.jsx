import React from 'react'

// got it from https://codepen.io/sujayraaj/pen/yPVGRx
class PieChart extends React.PureComponent {
	theta = 0
	currentPos = [0, 0]

	calculatePos({ width, height, radius }) {
		const theta = this.theta || 0

		return [
			width / 2.0 + radius * Math.sin(theta),
			height / 2.0 - radius * Math.cos(theta),
		]
	}

	calculatePath() {
		const { width, height, radius } = { ...this.props }

		this.theta = 0
		this.currentPos = this.calculatePos({ width, height, radius })

		const pathData = this.props.data.reduce((acc, curr, ind) => {
			this.theta += (curr.value / 100) * 2 * Math.PI

			const nextPos = this.calculatePos({ width, height, radius })
			const isBigCurveInt = curr.value / 100 > 0.5 ? 1 : 0

			const path = (
				<path
					d={`M${+width / 2} ${+height / 2} L ${this.currentPos[0]} ${
						this.currentPos[1]
					} A ${radius} ${radius} 0 ${isBigCurveInt} 1 ${
						nextPos[0]
					} ${nextPos[1]} L ${width / 2.0} ${height / 2.0}`}
					fill={curr.color}
					//fillOpacity={curr.opacity}
					strokeWidth="3"
					stroke="#fff"
					key={ind}
				/>
			)

			this.currentPos = nextPos
			acc.push(path)
			return acc
		}, [])

		return pathData
	}

	render() {
		return (
			<svg
				className={[this.props.className, 'pieSVG'].join(' ')}
				viewBox={`0 0 ${this.props.height} ${this.props.width}`}
			>
				{this.calculatePath()}
			</svg>
		)
	}
}

export default PieChart
