'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/button';
import { AnimatedButtonArrowProps } from '@/types';

const AnimatedButtonArrow: React.FC<AnimatedButtonArrowProps> = ({
  children,
  href,
  bgColor,
  textColor,
  // color
}) => {
  return (
    <Button
      as={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      //   color={color}
      //   className="relative overflow-hidden group"
      className={`group relative overflow-hidden ${bgColor} ${textColor}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <a href={href} className="flex h-full w-full items-center justify-center">
        {children}
        <motion.div
          className="ml-2"
          initial={{ x: -5, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.div>
      </a>
    </Button>
  );
};

export default AnimatedButtonArrow;
