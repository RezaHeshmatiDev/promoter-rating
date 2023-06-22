import { useState, useEffect, useRef } from "react";
import { Typography, useTheme } from "@mui/material";

import { getCurrentTime } from "../../utils/Functions";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());
  const timeInterval = useRef<any>(null);

  const theme = useTheme();

  useEffect(() => {
    intervalToCurrentTime();

    return () => {
      clearInterval(timeInterval.current);
    };
  }, []);

  const intervalToCurrentTime = () => {
    timeInterval.current = setInterval(() => {
      const time = getCurrentTime();
      setCurrentTime(time);
    }, 1000);
  };

  return (
    <Typography color={theme.palette.common.white} variant={"caption"}>
      {currentTime}
    </Typography>
  );
};

export default CurrentTime;
