import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialMinutes?: number;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes = 15 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2 font-bold text-white">
      <span className="text-yellow-300">⏰</span>
      <span>OFERTA ACABA EM {formatTime(timeLeft)} MINUTOS!</span>
    </div>
  );
};

export default Timer;