'use client'
import {AnimatePresence, motion} from "motion/react";
import Image from "next/image";
import { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface AuthPageWrapperProps {
    children: ReactNode;
}

export default function AuthPageWrapper({children}: AuthPageWrapperProps) {

    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/getItems', {
                method: 'GET',
            });
            const data = await response.json();
            setItems(data);
        };
        fetchItems();
    }, []);

    return(
        <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:m-0 m-4 bg-background-100">
                <div className="flex justify-center items-center bg-background-500 shadow-xl md:rounded-r-xl rounded-xl md:rounded-l-none">
                    <div className="bg-background-700 my-4 mx-4 md:mr-4 md:ml-0 w-full py-4 shadow-xl md:rounded-r-xl rounded-xl md:rounded-l-none">
                        <div className="bg-background-600 relative mx-4 md:mr-4 md:ml-0 w-full py-20 shadow-xl md:rounded-r-xl rounded-xl md:rounded-l-none flex items-center">
                        <div className="flex justify-start w-full">
                            {children}
                        </div>
                        </div>
                    </div>
                </div>
                    <div>
                        <div className="grid grid-cols-4 gap-2 grid-flow-row auto-rows-fr m-7">
                        {items.length > 0 && Array.from({ length: 16 }).map((_, index) => {
                            const item = items[index % items.length];
                            return (
                                <div className="transform rotate-6" key={index}>
                                    <AnimatePresence>
                                        <motion.div
                                            className="border-4 border-primary-600 w-[250px] h-[250px] p-4 rounded-xl transform rotate-6"
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
                                            {/* img instead Image */}
                                            <img 
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain rounded-xl"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                    </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}