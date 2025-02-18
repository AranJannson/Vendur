"use client";

import { motion } from "framer-motion";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { Link } from "react-scroll";

const BouncingArrow = () => {
    return (
        <Link to="scroll_target" smooth={true} duration={800} className="z-40">
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="cursor-pointer"
            >
                <IoArrowDownCircleOutline className="text-4xl" />
            </motion.div>
        </Link>
    );
};

export default BouncingArrow;
