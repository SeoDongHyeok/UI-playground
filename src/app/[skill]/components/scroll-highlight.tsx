'use client'

import { skills } from "@/skilldata";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";


export default function ScrollHighlight() {
    const ulY = useRef<HTMLUListElement>(null)
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleWheel = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleWheel);
        return () => {
            window.removeEventListener("scroll", handleWheel);
        };
    }, []);

    return (
        <div
            className="w-full bg-gradient-to-r from-purple-700 via-red-500 to-yellow-400">
            <div className="flex h-full justify-center px-2 py-50 text-[white]"
                style={{ height: (skills.length * 112) + 900 }}>
                <h1 className="sticky mb-auto top-[100px] text-5xl font-bold leading-[inherit] font-inter"
                    style={{
                        transform: "rotate(-90deg) translate(-36%, 50%)"
                    }}>SKILLS</h1>
                <ul
                    ref={ulY}
                    className="space-y-4">
                    {
                        skills.map((skill, i) => {
                            const distance = Math.floor(scrollY / 100);
                            let opacity;
                            if (distance <= skills.length - 1) {
                                opacity = distance == i ? 1 : 0.3;
                            } else {
                                opacity = (skills.length - 1) == i ? 1 : 0.3;
                            }


                            return (
                                <motion.li
                                    key={skill.id}
                                    animate={{
                                        opacity, scale: opacity == 1 ? "1.02" : "1"
                                    }}
                                    className="opacity-30 text-8xl text-left font-bold font-inter uppercase"
                                >
                                    {skill.name}
                                </motion.li>
                            );
                        }
                        )
                    }
                </ul>
            </div>
        </div>
    );
}