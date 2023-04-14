import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { secondsToTime } from "utils/time";

const Timer = ({ quizSession, onTimeout }) => {
  const [count, setCount] = useState(quizSession.duration);

  useEffect(() => {
    const intervalId = setInterval(() => setCount((count) => count + 1));
    return clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (count <= 0) onTimeout?.();
    else setTimeout(() => setCount(count - 1), 1000);
  }, [count, onTimeout]);
  
  return (
    <Box padding={1}>
      <TimeIcon /> {secondsToTime(count)}
    </Box>
  );
};

export default Timer;
