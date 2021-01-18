import styled from 'styled-components'
import Book from './shapeDividers/Book'
import Curve from './shapeDividers/Curve'
import Split from './shapeDividers/Split'
import Tilt from './shapeDividers/Tilt'
import Triangle from './shapeDividers/Triangle'
import TriangleAsymetrical from './shapeDividers/TriangleAsymetrical'
import Wave from './shapeDividers/Wave'
import WaveAlt from './shapeDividers/WaveAlt'
import WaveFade from './shapeDividers/WaveFade'

const shapeDividers = {
  book: Book,
  curve: Curve,
  split: Split,
  tilt: Tilt,
  triangle: Triangle,
  'triangle-asymetrical': TriangleAsymetrical,
  wave: Wave,
  'wave-alt': WaveAlt,
  'wave-fade': WaveFade,
}

const ShapeDivider = ({ name = 'tilt', position, inverted, flipped, style, className, ...props }) => {
  const Component = shapeDividers[name]

  return <Component className={className} inverted={inverted} {...props} />
}

export default styled(ShapeDivider)`
  position: absolute;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: 10;
  color: ${({ color, theme }) => (color ? theme.color[color] : 'white')};
  ${({ position, flipped, inverted }) =>
    position === 'bottom'
      ? `
  bottom: 0;
  transform: ${!inverted ? `rotate(180deg)` : ``}${flipped ? ` scaleX(-100%)` : ``};
  `
      : `
    top: 0;
    ${
      flipped || inverted
        ? `transform: ${flipped ? `scaleY(-100%)` : ``}${flipped && inverted ? ` ` : ``}${
            inverted ? `rotate(180deg);` : ``
          };`
        : ``
    }
  `}
  height: 120px;
`
