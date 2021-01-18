export default function Svg({ className = '', inverted, ...props }) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor" className={className} {...props}>
      {inverted ? (
        <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" />
      ) : (
        <path d="M1200 0L0 0 598.97 114.72 1200 0z" />
      )}
    </svg>
  )
}
