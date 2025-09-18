'use client'

import { motion } from 'motion/react';

type moviePoster = {
    id: number
    img: string
}



const moviePoster: moviePoster[] = [
    { id: 1, img: "/img/movie_poster/indiana_jones.jpg" },
    { id: 2, img: "/img/movie_poster/starwars.jpg" },
    { id: 3, img: "/img/movie_poster/lionking.jpg" },
    { id: 4, img: "/img/movie_poster/leon.jpg" },
    { id: 5, img: "/img/movie_poster/life_is_beautiful.jpg" },
    { id: 6, img: "/img/movie_poster/forrest_gump.jpg" },
    { id: 7, img: "/img/movie_poster/the_sixth_sense.jpg" },
    { id: 8, img: "/img/movie_poster/inception.jpg" },
    { id: 9, img: "/img/movie_poster/the_dark_knight.jpg" },
]

export function PosterUI({
    isUp,
    seq,
}: {
    isUp: boolean,
    seq: number,
}) {
    return (
        <motion.ul
            initial={{ y: isUp ? 0 : -1200 }}
            animate={{ y: isUp ? -840 : -358 }}
            transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            }}
            className="grid w-full h-full gap-3"
        >
            {
                [...moviePoster.slice(seq * 3, (seq * 3) + 3), ...moviePoster.slice(seq * 3, (seq * 3) + 3)].map((movie, idx) => (
                    <li key={`${movie.id} - ${idx}`}>
                        <img src={movie.img} />
                    </li>
                ))
            }

        </motion.ul>
    );
}

export default function MovieFilm() {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-black">
            <div className="grid grid-cols-3 justify-items-center relative gap-10 w-160 h-120 border-1 border-black overflow-hidden "
                style={{ transform: "perspective(600px) rotateX(25deg)" }}>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-[#ffffff]/0 z-10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-[#ffffff]/0 z-10" />
                {
                    [0, 1, 2].map((idx) => (
                        <PosterUI key={idx + 1} isUp={idx % 2 == 0} seq={idx} />
                    ))
                }
            </div>
        </div>
    );
}