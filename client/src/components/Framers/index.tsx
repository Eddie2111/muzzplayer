import React from 'react';

import { motion } from 'framer-motion';

export function LeftFramingAnimation({
  children,
  speed,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: speed || 0.5 }}
    >
      {" "}
      {children}{" "}
    </motion.div>
  );
}
export function RightFramingAnimation({
  children,
  speed,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: speed || 0.5 }}
    >
      {" "}
      {children}{" "}
    </motion.div>
  );
}
