import { useEffect, useState } from "react";

const TICKS_PER_MINUTE = 0.1;

const useTick = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(tick + 1);
    }, 60000 / TICKS_PER_MINUTE);
    return () => clearInterval(interval);
  }, [tick]);

  return tick;
};

export default useTick;
