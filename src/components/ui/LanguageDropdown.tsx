import { BsStars } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

export default function LanguageDropdown({
  isHost,
  lang,
  handleSetLang,
}: {
  isHost: boolean;
  lang: string;
  handleSetLang: (lang: string) => void;
}) {
  return (
    <div className="flex justify-end -mt-8 mb-4 md:mb-6">
      <div className="dropdown text-sm md:text-base font-normal inline-block relative">
        <button className="bg-bgLit border border-gray-600 text-gray-400 font-semibold py-2 px-3 rounded-lg inline-flex items-center">
          <BsStars className="text-base md:text-lg text-yellow-500 opacity-70" />
          <span className="ml-1">Language</span>
        </button>
        <ul className="dropdown-menu absolute hidden text-gray-300 pt-1 text-left w-40 md:w-48 right-0">
          <li className="">
            <a
              className={`${
                isHost && lang == "English" ? "bg-primary" : "bg-bgLight"
              } rounded-t  border border-gray-700  py-2 px-4 whitespace-no-wrap flex justify-between items-center cursor-default`}
              href="#"
              onClick={() => isHost && handleSetLang("English")}
            >
              <span>English</span>
              {lang == "English" && <TiTick className="text-base md:text-lg text-yellow-500 -mr-2" />}
            </a>
          </li>
          <li className="">
            <a
              className={`${
                isHost && lang == "Bangla" ? "bg-primary" : "bg-bgLight"
              } rounded-b  border border-gray-700  py-2 px-4 whitespace-no-wrap flex justify-between items-center cursor-default`}
              href="#"
              onClick={() => isHost && handleSetLang("Bangla")}
            >
              <div>
                <span>Bangla</span>
                <span
                  className={`${
                    lang == "Bangla" ? "bg-primary" : "bg-bgLight"
                  }  italic px-1 rounded-lg text-xs text-yellow-400 border border-yellow-400 ml-1`}
                >
                  Beta
                </span>
              </div>

              {lang == "Bangla" && <TiTick className="text-base md:text-lg text-yellow-500 -mr-2" />}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
