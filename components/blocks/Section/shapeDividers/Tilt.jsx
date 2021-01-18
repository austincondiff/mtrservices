export default function Svg({ className = '', inverted, ...props }) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor" className={className} {...props}>
      <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" />
    </svg>
  )
}
