export default function Svg({ className = '', inverted, ...props }) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor" className={className} {...props}>
      {inverted ? (
        <path d="M600,13.2C600,5.09,591.12,0,580.08,0H0v27.97h1200V0H619.92C608.88,0,600,5.06,600,13.2z" />
      ) : (
        <path d="M0,0V3.6H580.08c11,0,19.92,5.09,19.92,13.2,0-8.14,8.88-13.2,19.92-13.2H1200V0Z" />
      )}
    </svg>
  )
}
