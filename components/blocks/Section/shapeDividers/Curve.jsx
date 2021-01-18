export default function Svg({ className = '', size = '24', inverted, ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none" {...props}>
      {inverted ? (
        <path d="M0,0c0,0,240,59.41,600,59.41S1200,0,1200,0v120H0V1.19V0z" />
      ) : (
        <path d="M0,0c0,0,240,59.41,600,59.41S1200,0,1200,0H0z" />
      )}
    </svg>
  )
}
