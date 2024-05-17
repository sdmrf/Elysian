import React from "react";
import { motion } from "framer-motion";

const FramerWrapper = ({
  children,
  x = 0,
  y = 0,
  isVertical = false,
}: {
  children: React.ReactNode;
  x?: number;
  y?: number;
  isVertical?: boolean;
}) => {
  const hiddenVariant = isVertical
    ? { opacity: 0, y: y }
    : { opacity: 0, x: x };

  const visibleVariant = isVertical
    ? { opacity: 1, y: 0 }
    : { opacity: 1, x: 0 };

  return (
    <motion.div
      variants={{
        hidden: hiddenVariant,
        visible: visibleVariant,
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default FramerWrapper;
