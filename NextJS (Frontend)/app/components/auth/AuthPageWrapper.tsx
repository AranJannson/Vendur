'use client'
import {AnimatePresence, motion} from "motion/react";
import Image from "next/image";
import { ReactNode } from 'react';

interface AuthPageWrapperProps {
    children: ReactNode;
}

export default function AuthPageWrapper({children}: AuthPageWrapperProps) {

    return(
        <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:m-0 m-4">
                <div className="flex justify-center items-center bg-background-400 shadow-xl md:rounded-r-xl rounded-xl md:rounded-l-none">
                    <div className="bg-background-300 my-4 mx-4 md:mr-4 md:ml-0 w-full py-4 shadow-xl md:rounded-r-xl rounded-xl md:rounded-l-none flex justify-center">
                        <div className="bg-background-200 relative mx-4 md:mr-4 md:ml-0 w-full py-20 shadow-xl md:rounded-r-xl rounded-xl md:rounded-l-none flex justify-start">
                            {children}
                        </div>
                    </div>
                </div>
                    <div>
                        <div className="grid grid-cols-4 gap-2 grid-flow-row auto-rows-fr">
                        {Array.from({length: 16}).map((_, index) => (
                            <div className="transform rotate-6" key={index}>
                                <AnimatePresence>
                                    <motion.div
                                        className="border-4 border-white w-full h-full p-7 rounded-xl transform rotate-6"
                                        animate={{
                                            y: ['0%', '-10%', '0%'],
                                            scale: 0.8,
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatType: 'loop',
                                            ease: 'easeInOut',
                                            delay: Math.random() * 2,
                                        }}
                                        initial={{opacity: 1, scale: 1}}
                                    >
                                        <Image
                                            src="https://dummyimage.com/500x500/fcf9fc/000000"
                                            alt="temp_image"
                                            height="500"
                                            width="500"
                                            className="rounded-lg"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}