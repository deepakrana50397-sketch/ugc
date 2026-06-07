'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  mode?: 'words' | 'chars';
  style?: React.CSSProperties;
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.8,
  tag = 'h2',
  mode = 'words',
  style = {},
}: TextRevealProps) {
  const Tag = tag;

  // Split text by word or character
  const items = mode === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === 'words' ? 0.08 : 0.02,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '100%',
      transition: { ease: [0.16, 1, 0.3, 1] as const, duration },
    },
    visible: {
      y: 0,
      transition: { ease: [0.16, 1, 0.3, 1] as const, duration },
    },
  };

  return (
    <Tag className={className} style={style}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        style={{ display: 'inline-flex', flexWrap: 'wrap', overflow: 'hidden' }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              marginRight: mode === 'words' ? '0.25em' : '0em',
              lineHeight: 1.15,
            }}
          >
            <motion.span
              variants={itemVariants}
              style={{ display: 'inline-block' }}
            >
              {item === ' ' ? '\u00A0' : item}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

