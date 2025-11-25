import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

type CountdownMode = "countdown" | "timer";
type CountdownFormat =
  | "days-hours-minutes-seconds"
  | "days-hours-minutes"
  | "hours-minutes-seconds";

interface CountdownProps {
  date: string | Date | moment.Moment;
  mode?: CountdownMode;
  timezone?: string;
  stopAtZero?: boolean;
  format?: CountdownFormat;
  onComplete?: () => void;
  showLabels?: boolean;
  className?: string;
}

export function CountdownLayout({
  date,
  mode = "countdown",
  timezone = moment.tz.guess(),
  stopAtZero = true,
  format = "days-hours-minutes-seconds",
  showLabels = false,
  onComplete,
  className,
}: CountdownProps) {
  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    const target = moment.tz(date, timezone);
    const hasSeconds = format.includes("seconds");
    const refreshRate = hasSeconds ? 1000 : 60000;

    let interval: NodeJS.Timeout | null = null;

    const update = () => {
      const now = moment.tz(timezone);
      let diffSeconds =
        mode === "countdown"
          ? target.diff(now, "seconds")
          : now.diff(target, "seconds");

      if (mode === "countdown" && diffSeconds <= 0) {
        diffSeconds = 0;
        if (stopAtZero && interval) {
          clearInterval(interval);
          interval = null;
          onComplete?.();
        }
      }

      const duration = moment.duration(diffSeconds, "seconds");
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      const dLabel = showLabels ? (days === 1 ? " day " : " days ") : "d ";
      const hLabel = showLabels ? (hours === 1 ? " hour " : " hours ") : "h ";
      const mLabel = showLabels ? (minutes === 1 ? " minute " : " min ") : "m ";
      const sLabel = showLabels ? (seconds === 1 ? " second" : " sec") : "s";

      let formatted = "";

      switch (format) {
        case "days-hours-minutes":
          formatted = `${days}${dLabel}${String(hours).padStart(2, "0")}${hLabel}${String(
            minutes,
          ).padStart(2, "0")}${mLabel}`;
          break;

        case "hours-minutes-seconds": {
          const totalHours = Math.floor(duration.asHours());
          formatted = `${totalHours}${hLabel}${String(minutes).padStart(
            2,
            "0",
          )}${mLabel}${String(seconds).padStart(2, "0")}${sLabel}`;
          break;
        }

        default:
          formatted = `${days}${dLabel}${String(hours).padStart(2, "0")}${hLabel}${String(
            minutes,
          ).padStart(
            2,
            "0",
          )}${mLabel}${String(seconds).padStart(2, "0")}${sLabel}`;
          break;
      }

      setDisplay(formatted);
    };

    update();
    interval = setInterval(update, refreshRate);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [date, mode, timezone, format, stopAtZero, onComplete, showLabels]);

  return <span className={className}>{display}</span>;
}
