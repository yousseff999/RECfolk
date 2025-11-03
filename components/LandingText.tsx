'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTextProps {
  words: string[];
  interval?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ words, interval = 1000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className="overflow-hidden inline-block lg:absolute md:absolute lg:h-[1.3em] w-full sm:w-[5.65em] sm:ml-[1.5vw] lg:ml-6 ml-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.7 }}
        >
          {words[currentWordIndex].split('').map((char, index) => (
            <motion.span
              key={index}
              className="inline-block text-accent" // Accent red for animated words
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Page1: React.FC = () => {
  return (
    <div className="page-part-1 w-full h-[44vw] lg:h-[27vw] sm:h-[39vw] md:h-[45vw] 
                    p-4 lg:p-14 sm:p-4 md:p-14 pt-10 sm:pt-10 flex font-[Satoshi] 
                    bg-primary text-light relative overflow-hidden">
      <div className="content flex flex-col h-full mt-12 sm:mt-24 
                      text-2xl sm:text-4xl md:text-5xl lg:text-[6vw] tracking-tighter 
                      leading-tight sm:leading-[1.1] md:leading-[6vw] font-semibold">
        <motion.h1
          className="text-light mb-2 sm:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Creative studio
        </motion.h1>

        <motion.h1
          className="text-light flex"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          for timeless{' '}
          <span className="block sm:inline relative h-[1.3em]">
            <AnimatedText
              words={['strategy', 'packaging', 'motion', 'naming', 'branding']}
              interval={1500}
            />
          </span>
        </motion.h1>

        {/* Optional accent underline for style */}
        <div className="absolute bottom-4 left-0 w-[60px] h-[3px] bg-accent rounded-full"></div>
      </div>
    </div>
  );
};

export default Page1;
