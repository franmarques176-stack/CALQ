import { useState, useEffect } from 'react';

const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Parsear el número del texto
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setDisplayValue(value);
      return;
    }

    const startValue = 0;
    const endValue = numValue;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    animate();
  }, [value, duration]);

  const formatNumber = (num) => {
    if (typeof num === 'number') {
      // Mantener decimales si es necesario
      return num % 1 === 0 ? num.toFixed(0) : num.toFixed(4);
    }
    return num;
  };

  return (
    <span className="inline-block font-mono font-bold text-cyan-400 animate-pulse-subtle">
      {formatNumber(displayValue)}
    </span>
  );
};

export default AnimatedNumber;
