export default function Logo({ size, className = "" }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src="/logo.png" 
        alt="Drishti SwarmOps Logo" 
        style={size ? { height: typeof size === 'number' ? `${size}px` : size } : undefined}
        className={`w-auto object-contain transition-all duration-300 hover:scale-105 dark:drop-shadow-[0_0_25px_rgba(249,115,22,0.45)] drop-shadow-[0_4px_14px_rgba(249,115,22,0.28)] ${
          size ? '' : 'h-[72px] sm:h-[82px] md:h-[92px] lg:h-[98px]'
        }`}
      />
    </div>
  );
}

