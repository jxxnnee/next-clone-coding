
interface IconProps {
    src: string
    tintColor?: string
    className: string
}

function Icon ({ 
    className = '',
    src, 
    tintColor, 
}: IconProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: tintColor,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}

export default Icon