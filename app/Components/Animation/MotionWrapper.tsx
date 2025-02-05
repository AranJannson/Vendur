'use client'

import React, { FC } from 'react';
import { AnimatePresence, MotionProps, motion } from "motion/react"

interface MotionWrapperProps {
    className?: string;
    children: React.ReactNode;
    initial?: MotionProps['initial'];
    whileInView?: MotionProps['whileInView'];
    transition?: MotionProps['transition'];
    viewport?: MotionProps['viewport'];
}

// Default Values Have Been Set
// https://motion.dev/docs/react-animate-presence
const MotionWrapper: FC<MotionWrapperProps> = ({
    className,
    children,
    initial = { opacity: 0, x: -100 },
    whileInView = { opacity: 1, x: 0 },
    transition = { type: 'spring', stiffness: 120, duration: 0.5, delay: 0.5 },
    viewport = { once: true }
    }) => {

    return (
        <AnimatePresence>
            <motion.div
                className={className}
                initial={initial}
                whileInView={whileInView}
                transition={transition}
                viewport={viewport}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default MotionWrapper;