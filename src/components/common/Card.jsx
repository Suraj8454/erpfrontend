
export default function Card({ children, className = '', hover = false }) {
  return (
    <div className={`
      bg-white/80 backdrop-blur-sm 
      rounded-xl 
      border border-gray-200/60 
      shadow-sm 
      ${hover ? 'hover:shadow-md hover:border-gray-300/80 transition-all duration-200' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
}