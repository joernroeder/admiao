/**
 * Styled System Rhythm
 *
 * Vertical Rhythm helpers for styled-system which gives you the `verticalRhythm`
 * prop as well as a `verticalRhythmProps` function to set responsive values up.
 *
 * @example
 *
 * import {verticalRhythm, verticalRhythmProps, VerticalRhythmProps} from '../utils/styled-system-rhythm';
 *
 * const Heading = styled.h1<SpaceProps & VerticalRhythmProps>`
 *   ${color}
 *   ${space}
 *   ${verticalRhythm}
 * `;
 *
 * Heading.defaultProps = {
 * 	 ...verticalRhythmProps([0, 1]),
 *   color: 'black',
 * 	 my: 0
 * };
 *
 * export default Heading;
 */
import { compose, fontSize, lineHeight, system } from 'styled-system'

const rhythmTransform = system({
	// @ts-ignore
	rhythmTransform: {
		property: 'transform',
		scale: 'rhythmTransforms',
		defaultScale: 0,
	},
})

export const verticalRhythm = compose(
	fontSize,
	lineHeight,
	rhythmTransform
)

export const verticalRhythmProps = size => {
	return {
		fontSize: size,
		lineHeight: size,
		rhythmTransform: size,
	}
}
