'use client'

import Link from "next/link";
import { skills } from '../skilldata';
import Image from "next/image";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent } from "motion/react";

function SkillsSlideMenu() {
  const [dragX, setDragX] = useState(0);
  const x = useMotionValue(0); //MotionValue는 key가 css 속성 이름이어야만 적용돼요.
  const showSkillsDiv = useRef<HTMLDivElement>(null);
  const [showSkillsWidth, setShowSkillsWidth] = useState(0);
  const allSkillsDiv = useRef<HTMLDivElement>(null);
  const [allSkillsWidth, setAllSkillsWidth] = useState(0);
  const [leftOpacity, setLeftOpacity] = useState(0);
  const [rightOpacity, setRightOpacity] = useState(1);


  useEffect(() => {
    if (allSkillsDiv.current) {
      setAllSkillsWidth(allSkillsDiv.current.offsetWidth);
    }

    if (showSkillsDiv.current) {
      setShowSkillsWidth(showSkillsDiv.current.offsetWidth);
    }

    window.addEventListener("resize", () => setShowSkillsWidth(showSkillsDiv.current?.offsetWidth || 0));

  }, []);

  useMotionValueEvent(x, "change", (latest) => {
    console.log(latest)
    setLeftOpacity(latest >= 0 ? 0 : 1);
    setRightOpacity(latest <= (-(allSkillsWidth + 30) + showSkillsWidth) ? 0 : 1);
  })

  return (
    <motion.div className="relative overflow-x-hidden mt-5 py-5 pl-5 w-full " ref={showSkillsDiv}>
      <div
        className="opactiry-0.3 pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f5f5f5]/100 to-[#f5f5f5]/0 z-10"
        style={{ opacity: leftOpacity }}
      />
      <div
        className="opactiry-0.3 pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f5f5f5]/100 to-[#f5f5f5]/0 z-10"
        style={{ opacity: rightOpacity }}
      />
      <motion.div
        className="flex gap-10 w-fit "
        ref={allSkillsDiv}
        drag="x"
        dragConstraints={{
          left: -(allSkillsWidth + 30) + showSkillsWidth,
          right: 0
        }}
        style={{ x }}
        onDrag={(e, info) => {
          setDragX(info.offset.x); // 현재 드래그 거리 저장
        }}
      >
        {skills.map((skill) => (
          <Link
            href={`/${skill.name}`}
            key={skill.id}
            onClick={(e) => {
              if (Math.abs(dragX) > 5) { // 5는 드래그로 판단할 최소 이동 픽셀
                e.preventDefault(); // 드래그일 경우 링크 이동 막기
              }
              setDragX(0); // 클릭 후 초기화
            }}
            className="backdrop-blur-lg rounded-xl shadow-lg"
          >
            <div className="relative w-[260px] h-[185px]">
              <Image
                src={skill.img}
                alt={skill.name}
                fill
                className="aspect-video rounded-lg"
              />
              <div className="
                absolute inset-0
                flex items-center justify-center 
                text-[#e3e3e3] text-xl font-bold font-sans
                opacity-0 hover:opacity-100 
                transition-opacity duration-500
                bg-black/70 rounded-[10px]
              ">
                {skill.name}
              </div>
            </div>
          </Link>
        ))
        }
      </motion.div >
    </motion.div >
  );

}

export default function Home() {

  return (
    <div className="flex">
      <div className="px-20 py-20 w-full bg-gradient-to-b from-[#f5f5f5] via-white to-[#ebebeb] xl:px-45">
        <div className="w-full mb-20 lg:h-90">
          <p className="pl-5 text-3xl font-bold ">UI Animation</p>
          <SkillsSlideMenu />
        </div>
        <div className="ml-5 mb-15 w-full border-b-4 border-gray-500 opacity-20 rounded-[10px]" />
        <div className="w-full">
          <p className="mb-10 pl-5 text-3xl font-bold ">Latest Updates</p>


          <div className="grid ml-5 gap-15 lg:flex lg:gap-35">
            <div className="bg-white p-6 w-full rounded-xl shadow-lg lg:w-80">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Learning & Development</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-700">THREE JS</p>
                    <p className="text-gray-500 text-sm">CSS 3D 시각화 애니메이션</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-700">Chat UI</p>
                    <p className="text-gray-500 text-sm">채팅 인터페이스 웹 UI</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 w-full rounded-xl shadow-lg lg:w-80">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Finished Technologies</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-700">Scroll HighLight</p>
                    <p className="text-gray-500 text-sm">스크롤 위치에 따른 강조 인터랙션 기능</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-700">Color Chart</p>
                    <p className="text-gray-500 text-sm">색상 팔레트 코드 시각화</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-700">Play List</p>
                    <p className="text-gray-500 text-sm">노래 재생 목록 시퀀싱 및 재생 애니메이션</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
