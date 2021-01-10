import styled from 'styled-components'
import theme from '@styles/theme'

const buttonHeight = 56

const ButtonWrap = styled.button`
  background: ${({ variant }) =>
    variant === 'contained' ? `linear-gradient(134deg, #F25E1C 0%, #EDC621 100%)` : `transparent`};
  border-radius: ${({ size, theme }) => theme.button.size[size].height / 2}px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: ${({ size, theme }) => theme.button.size[size].fontSize}px;
  letter-spacing: 0.57px;
  text-align: center;
  height: ${({ size, theme }) => theme.button.size[size].height}px;
  padding: 0 ${({ size, theme }) => theme.button.size[size].height / 2}px;
  border: 0;
  position: relative;
  cursor: pointer;
  transition: 200ms;
  outline: none;
  transform: scale(1);
  box-shadow: 0 0 0 rgba(242, 94, 28, 0);
  &:hover {
    transform: scale(1.05);
    ${({ variant }) =>
      variant === 'outlined' || variant === 'contained' ? `box-shadow: 0 16px 48px rgba(242, 94, 28, 0.25);` : ``}
    ${({ variant }) => (variant === 'outlined' || variant === 'ghost' ? `background-color: rgba(242,94,28,0.1);` : ``)}
  }
`

const Button = ({ children, size = 'md', variant = 'ghost', ...props }) => (
  <ButtonWrap variant={variant} size={size} {...props}>
    {variant === 'outlined' && (
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="linearGradient">
            <stop stopColor="#F25E1C" offset="0%"></stop>
            <stop stopColor="#EDC621" offset="100%"></stop>
          </linearGradient>
        </defs>
        <rect
          fill="none"
          stroke="url(#linearGradient)"
          strokeWidth="3"
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx={theme.button.size[size].height / 2}
        ></rect>
      </svg>
    )}
    <span>{children}</span>
  </ButtonWrap>
)

export default Button

export const ButtonGroup = styled.div`
  display: inline-flex;
  gap: ${({ gap = 'md', theme }) => theme.spacing[gap] || 0}px;
  flex-direction: ${({ orientation }) => (orientation === 'vertical' ? `column` : ``)};
`
