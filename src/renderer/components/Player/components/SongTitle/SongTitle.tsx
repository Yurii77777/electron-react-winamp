import { useRef, useEffect, useState, FC } from 'react';

type SongTitleProps = {
  title: string;
};

export const SongTitle: FC<SongTitleProps> = ({ title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    if (containerRef.current && textRef.current) {
      setIsOverflowing(
        textRef.current.scrollWidth > containerRef.current.clientWidth,
      );
    }
  };

  useEffect(() => {
    checkOverflow();

    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [title]);

  return (
    <div
      className="relative font-dogica text-green-1 text-xs h-6 min-h-6 
                w-full bg-black overflow-hidden whitespace-nowrap 
                secondary-shadow tertiary-shadow"
      ref={containerRef}
    >
      <span
        ref={textRef}
        className={`inline-block ${
          isOverflowing ? 'animate-marquee-alternate' : ''
        }`}
      >
        {title}
      </span>
    </div>
  );
};
