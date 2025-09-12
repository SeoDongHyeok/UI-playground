"use client"

import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

// 메뉴 토글을 컴포넌트로 만들때 들어갈 데이터타입들
interface PathProps {
    d?: string
    variants: Variants
    transition?: { duration: number }
}

// 각 메뉴토글 공통부분과 들어온 props값에 따라 다른 각 모양들
const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
)

// 메뉴 버튼
const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button className="flex items-center justify-center w-11 h-11 rounded-[100px] bg-[white] cursor-pointer"
        onClick={toggle}>
        <svg width="23" height="23" viewBox="0 0 23 23">
            <g transform="translate(1 1)">
                <Path
                    variants={{
                        closed: { d: "M 2 2.5 L 20 2.5" },
                        open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                />
                <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.1 }}
                />
                <Path
                    variants={{
                        closed: { d: "M 2 16.346 L 20 16.346" },
                        open: { d: "M 3 2.5 L 17 16.346" },
                    }}
                />
            </g>
        </svg>
    </button>
)

// 네비게이션 밀려나오고 들어가는 애니메이션
const navVariant = {
    closed: {
        width: "",
        transition: {
            delay: 0.5
        },
        transitionEnd: {
            overflow: "visible",
        },
    },
    open: {
        width: "inherit",
        overflow: "hidden",
    },
}

// 곡 리스트 데이터타입
interface Songs {
    songImg: string,
    title: string,
}

// 곡 리스트 데이터
const songs: Songs[] = [
    { songImg: '/img/junni.png', title: 'junni' },
    { songImg: '/img/coastalworld.png', title: 'coastalworld' },
    { songImg: '/img/relight.png', title: 'relight' },
    { songImg: '/img/theatrejs.png', title: 'theatrejs' }];

// 곡 리스트 출력/지우기 애니메이션을 부드럽게
const menuItemUlVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }, // staggerChildren 자식요소들을 순차적으로 나오게함 , delayChildren 0.2초 있다가 실행되는거같음
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }, // 순차적으로 없어지는데 나타날때보단 살짝 빠르게 ,staggerDirection: -1 <-- 역순
    },
}

// 곡 리스트 Ul
const MenuItemUl = ({ changeSong }: { changeSong: (changeBgImg: string) => void }) => {

    return (
        <motion.ul variants={menuItemUlVariants}
            className="pt-3 overflow-y-auto overflow-x-hidden h-[90%] md:h-[94%]">
            {songs.map((song, index) => (
                <MenuItem key={index} song={song} changeSong={changeSong} />
            ))}
        </motion.ul>
    )
}

// 곡 리스트 출력/지우기 애니메이션
const itemVariants = {
    closed: {
        y: 50, // 아래로 내려가기
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }, // 애니메이션을 탄력있게함 수치는 무슨차이인지 모르겟음
        },
    },
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }, // 있고없을때 부드럽게 움직이는게 다른데 정확히 뭔지 모르겟음
        },
    },
}


// 곡 li
const MenuItem = ({ song, changeSong }: { song: Songs, changeSong: (changeBgImg: string) => void }) => {
    const menuItemIconCSS =
        " w-12 h-12 rounded-full flex-none mr-5 bg-cover bg-center ";
    const menuItemTextCSS = "flex-1 text-left truncate text-gray-400 font-semibold [font-family:ui-monospace]";

    return (
        <button onClick={() => changeSong(song.songImg)}>
            <motion.li
                className="flex items-center justify-start px-4 mb-3 w-[165px] cursor-pointer md:w-[235px]"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className={menuItemIconCSS}
                    style={{ backgroundImage: `url(${song.songImg})` }} />
                <div className={menuItemTextCSS} title={song.title}>{song.title}</div>
            </motion.li>
        </button>
    )
}


export default function PlayList() {
    const [isOpen, setIsOpen] = useState(false);
    const [isChangedSong, setIsChangedSong] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const [bgImg, setBgImg] = useState<string>(`url(${songs[0].songImg})`);
    const isMd = useMediaQuery({ minWidth: 768 }); // 브라우저 사이즈
    const navWidth = isMd ? 280 : 210;


    const changeSong = (changeBgImg: string) => {
        setIsChangedSong(true);
        setIsOpen((prev) => !prev);
        setBgImg(`url(${changeBgImg})`);
        if (imgRef.current) {
            imgRef.current.src = changeBgImg;
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen  bg-[#d1d1d1]">
            <div className="
                flex w-100 h-64 rounded-[20px] relative overflow-hidden
                md:w-190 md:h-130
            "
            >
                <motion.div
                    className="absolute inset-0 rounded-[20px]"
                    animate={
                        isChangedSong
                            ? { filter: ["brightness(0)", "brightness(0.5)"] }
                            : {}
                    }
                    style={{
                        backgroundImage: bgImg,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "brightness(0.5)"
                    }}
                    onAnimationComplete={() => setIsChangedSong(false)}
                ></motion.div>
                <motion.nav
                    initial={{ width: "0px" }}
                    className="bg-[white] h-full z-1"
                    animate={{
                        width: isOpen ? navWidth : "0px",
                    }}
                    transition={{
                        width: { duration: 0.4, delay: isOpen ? 0 : 0.5 },
                    }}
                >
                    <motion.div
                        className="p-4 h-full"
                        initial={false}
                        variants={navVariant}
                        animate={isOpen ? "open" : "closed"}
                    >
                        <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                        <MenuItemUl changeSong={changeSong} />
                    </motion.div>
                </motion.nav>
                <div className="self-center w-48 h-48 scale-50 relative md:scale-120 md:ml-35">
                    <motion.img
                        animate={
                            isChangedSong
                                ? { filter: ["brightness(0)", "brightness(1)"] }
                                : {}
                        }
                        ref={imgRef}
                        className="w-48 h-48 rounded-full animate-spin-slow"
                        style={{ backgroundImage: bgImg }} />
                    <div className="absolute bottom-2 left-22 w-24 h-24 overflow-hidden scale-110 [filter:blur(2px)]">
                        <div className="
                        w-48 h-48 rounded-full bg-[#000000a6] -translate-x-24 -translate-y-24">
                        </div>
                    </div>
                    <div className="absolute bottom-[-1] left-24 w-24 h-24 overflow-hidden scale-120">
                        <div className="
                        w-48 h-48 rounded-full [background:linear-gradient(-180deg,#000000_4%,#47494b_98%),radial-gradient(at_top_left,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.3)_100%)] -translate-x-24 -translate-y-24">
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

