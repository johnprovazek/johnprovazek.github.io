import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import SpriteSheet from "../../assets/images/sprite_sheet.png";

const lookoutSize = 85;
const lookoutAngle = 15;
const lookoutFrames = 360 / lookoutAngle;
const lookoutLayers = 2;
const startingIndex = 1;

const Lookout = () => {
  const [spriteIndex, setSpriteIndex] = useState(startingIndex);
  const lookoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rect = lookoutRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      let newIndex = lookoutLayers * lookoutFrames;
      if (distance > lookoutSize / 3) {
        const layer = distance > lookoutSize * 3 ? 1 : 0;
        const angleDegrees = (Math.atan2(dy, dx) * 180) / Math.PI + 180;
        newIndex = layer * lookoutFrames + (Math.round(angleDegrees / lookoutAngle) % lookoutFrames);
      }
      setSpriteIndex(newIndex);
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const blink = () => {
    setSpriteIndex(lookoutLayers * lookoutFrames + 1);
    setTimeout(() => {
      setSpriteIndex(lookoutLayers * lookoutFrames);
    }, 180);
  };

  return (
    <>
      <Box
        onClick={blink}
        ref={lookoutRef}
        sx={{
          cursor: spriteIndex == lookoutLayers * lookoutFrames ? "pointer" : "default",
          height: lookoutSize,
          width: lookoutSize,
          margin: "auto",
          backgroundImage: `url(${SpriteSheet})`,
          backgroundSize: lookoutSize * 10,
          backgroundPositionX: `-${lookoutSize * (spriteIndex % 10)}px`,
          backgroundPositionY: `-${lookoutSize * Math.floor(spriteIndex / 10)}px`,
          "-webkit-tap-highlight-color": "transparent",
        }}
      />
    </>
  );
};

export default Lookout;
