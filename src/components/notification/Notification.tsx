import React, { useState, useEffect } from "react";
import "./Notification.scss";
import TickIcon from "../icons/tickIcon";

function CustomNotification({ message, duration }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  return  (
    <div
      className={`custom-notification  flex gap-x-1.5 items-center ${
        visible ? "fade-in" : "fade-out"
      }`}
      onAnimationEnd={() => {
        if (!visible) {
          // Reset visibility after fade-out animation
          setVisible(true);
        }
      }}
    >
      <TickIcon color="var(--greenColor)" />
      {message}
    </div>
  ) 
}

export default CustomNotification;
