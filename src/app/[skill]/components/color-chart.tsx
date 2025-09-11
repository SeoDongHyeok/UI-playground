"use client"

import { AnimatePresence } from "motion/react";
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from "react";
import ColorBackSvg from "./color-backimage-svg";

interface Colors {
    name: string,
    code: string,
}

const colors: Colors[] = [
    { name: "Flavescent", code: "#FFE697" },
    { name: "Pewter Blue", code: "#84B9C0" },
    { name: "Beau Blue", code: "#C5D7F2" },
    { name: "Terra Cotta", code: "#E26559" },
    { name: "Hooker's Green", code: "#48767B" },
    { name: "Teal Blue", code: "#2B7799" },
]

export default function Color_chart() {
    const [openColor, setOpenColor] = useState(false);
    const [selColor, setSelColor] = useState<Colors>();
    const colorInfoDiv = useRef<HTMLDivElement>(null);

    const ClickColor_infoDivOutside = (event: MouseEvent) => {
        if (colorInfoDiv.current && !colorInfoDiv.current.contains(event.target as Node)) {
            closeColor();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", ClickColor_infoDivOutside);
        return () => {
            document.removeEventListener("mousedown", ClickColor_infoDivOutside);
        };
    }, [ClickColor_infoDivOutside]);

    const clickColor = (color: Colors) => {
        setOpenColor(true);
        setSelColor(color);
    }

    const closeColor = () => {
        setOpenColor(false);
        setSelColor(undefined);
    }



    return (
        <div>
            <AnimatePresence>
                {
                    openColor ?
                        <div ref={colorInfoDiv}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                exit={{ width: 0, transition: { delay: 0.3, duration: 0.3 } }}
                                className="absolute top-1/2 left-0 -translate-y-1/2 h-92 bg-[white] z-10"
                            ></motion.div>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                exit={{ width: 0, transition: { delay: 0.3, duration: 0.3 } }}
                                className="absolute top-1/2 left-0 -translate-y-1/2 h-92 z-10"
                                style={{ backgroundColor: selColor?.code + "5A" }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.3 } }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="grid grid-cols-2 gap-5 w-[100%] h-[100%] justify-self-center lg:w-[60%] g-10"
                                >
                                    <div className="w-[100%] p-8 text-center content-center justify-self-center lg:text-left">
                                        <h1 className="text-4xl font-bold">{selColor?.code} Hex Code</h1>
                                        <p className="text-sm my-5">Closest Name: {selColor?.name}</p>
                                    </div>
                                    <div className="w-[100%] grid place-items-center justify-self-center">
                                        <ColorBackSvg />
                                        <div
                                            className="absolute w-44 h-44 rounded-xl"
                                            style={{ backgroundColor: selColor?.code }}
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div> : null
                }
            </AnimatePresence>

            <div className="grid grid-cols-3 gap-5"
                style={openColor ? { filter: "blur(5px)" } : {}}>
                {
                    colors.map((color) => (
                        <button
                            key={color.name}
                            className="w-[150px] h-[150px] rounded-[60%_43%_40%_50%_/_50%_40%_60%_50%] cursor-pointer"
                            style={{ backgroundColor: color.code }}
                            onClick={() => { clickColor(color) }}>
                        </button>
                    ))
                }
            </div>
        </div>
    );
}