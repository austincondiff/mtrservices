export default function Svg({ className = '', inverted, ...props }) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor" className={className} {...props}>
      {inverted ? (
        <path d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z" />
      ) : (
        <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" />
      )}
    </svg>
  )
}
