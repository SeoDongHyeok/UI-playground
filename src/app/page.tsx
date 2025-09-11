import Link from "next/link";
import Navigator from "./components/navigator";
import { skills } from '../skilldata';


export default function Home() {

  return (
    <div className="flex">
      <Navigator />
      <div className="grid grid-cols-2 w-screen auto-rows-min sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7">
        {
          skills.map((skills) => (
            <Link href={`/${skills.name}`} key={skills.id}>
              <div className="flex justify-center aspect-[1.4] overflow-hidden">
                <img src={skills.img} className="scale-110 hover:scale-120 transition-transform duration-300 ease-in-out" />
              </div>
            </Link>
          ))
        }

      </div>
    </div>
  );
}
