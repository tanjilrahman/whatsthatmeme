import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

export default function LanguageDropdown({ isHost }: { isHost: boolean }) {
  const [lang, setLang] = useState("English");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div className="flex items-center">
      <div className="relative inline-block text-sm font-normal dropdown md:text-base">
        <button className="inline-flex items-center px-3 py-1 font-medium text-gray-400 border border-gray-600 rounded-lg bg-bgLit">
          <BsStars className="text-base text-yellow-500 md:text-lg opacity-70" />
          <span className="ml-1">{isHost ? lang : "Language"}</span>
        </button>
        <ul className="absolute right-0 hidden w-40 pt-1 text-left text-gray-300 dropdown-menu md:w-48">
          <li className="">
            <a
              className={`${
                isHost && lang == "English" ? "bg-primary" : "bg-bgLight"
              } rounded-t  border border-gray-700  py-2 px-4 whitespace-no-wrap flex justify-between items-center cursor-default`}
              href="#"
              onClick={() => isHost && setLang("English")}
            >
              <span>English</span>
              {lang == "English" && isHost && (
                <TiTick className="-mr-2 text-base text-yellow-500 md:text-lg" />
              )}
            </a>
          </li>
          <li className="">
            <a
              className={`${
                isHost && lang == "Bangla" ? "bg-primary" : "bg-bgLight"
              } rounded-b  border border-gray-700  py-2 px-4 whitespace-no-wrap flex justify-between items-center cursor-default`}
              href="#"
              onClick={() => isHost && setLang("Bangla")}
            >
              <div>
                <span>Bangla</span>
                <span
                  className={`${
                    lang == "Bangla" ? "bg-primary" : "bg-bgLight"
                  }  italic px-1 rounded-lg text-xs text-yellow-400 border border-yellow-400 ml-1`}
                >
                  Pro
                </span>
              </div>

              {lang == "Bangla" && isHost && (
                <TiTick className="-mr-2 text-base text-yellow-500 md:text-lg" />
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
