'use client'

import Link from "next/link";
import Navigator from "./components/navigator";
import { skills } from '../skilldata';
import Image from "next/image";
import * as motion from "motion/react-client";
import { useRef } from "react";

function SkillsSlideMenu() {
  const dragThreshold = 5; // 드래그로 판단할 최소 이동 픽셀
  const dragOffset = useRef(0);


  return (
    <motion.div className="overflow-x-hidden mt-5 py-5 pl-5 w-full">
      <motion.div
        className="flex gap-10 w-screen"
        drag="x"
        dragConstraints={{ left: (-324 * (skills.length - 4)) + 40, right: 0 }}
        onDrag={(e, info) => {
          dragOffset.current = info.offset.x; // 현재 드래그 거리 저장
        }}
      >

        {skills.map((skill) => (
          <Link
            href={`/${skill.name}`}
            key={skill.id}
            onClick={(e) => {
              if (Math.abs(dragOffset.current) > dragThreshold) {
                e.preventDefault(); // 드래그일 경우 링크 이동 막기
              }
              dragOffset.current = 0; // 클릭 후 초기화
            }}
            className="shadow-xl rounded-lg"
          >
            <div className="relative">
              <Image
                src={skill.img}
                alt={skill.name}
                width={260}
                height={185}
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
      <Navigator />
      <div className="px-45 py-20 w-screen bg-[#f5f5f5]">
        <div className="w-300 h-110">
          <p className="pl-5 text-3xl font-bold ">UI Animation</p>
          <SkillsSlideMenu />
        </div>
        <div className="ml-5 mb-15 w-300 border-b-4 border-gray-500 opacity-20 rounded-[10px]" />
        <div className="w-300 h-110">
          <p className="mb-10 pl-5 text-3xl font-bold ">Latest Updates</p>


          <div className="flex ml-5 gap-15">
            <div className="bg-white p-6 w-80 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Learning & Development</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-2 h-2 w-2 rounded-full bg-gray-400"></div>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-700">THREE JS</p>
                    <p className="text-gray-500 text-sm">CSS 3D 시각화 애니메이션</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 w-80 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Finished Technologies</h3>
              <ul className="space-y-4">
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
