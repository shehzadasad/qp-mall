import { FC, useState } from "react";
import Next from "shared/NextPrev/Next";
import Prev from "shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useMediaQuery } from "react-responsive";

export interface SectionHero2Props {
  className?: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);
  const history = useHistory();

  const navBar = useSelector(
    (state: any) => state.NavBar?.data?.data?.carousel_items
  );

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 7000 : null
  );
  //

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= navBar?.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= navBar.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return navBar.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };

  const isMobile = useMediaQuery({ query: "(min-width: 480px)" });

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = navBar[index];
    if (!isActive) {
      return null;
    }

    return (
      <>
        <div
          className={`nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
          key={uuidv4()}
        >
          {navBar?.map((_: any, index: any) => {
            <div
              key={uuidv4()}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex justify-center"
            >
              <div
                onClick={() => {
                  setIndexActive(index);
                  handleAfterClick();
                }}
                className={`relative px-1 py-1.5 cursor-pointer`}
              >
                <div
                  className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}
                >
                  {isActive && (
                    <div
                      className={`nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md ${
                        isActive ? " " : " "
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            </div>;
          })}
          <Prev
            className="absolute left-1 sm:left-5 md:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
            btnClassName="w-7 h-7 lg:w-12 lg:h-12  hover:border-slate-400 dark:hover:border-slate-400"
            svgSize="w-4 h-4 lg:w-6 lg:h-6 stroke-white"
            onClickPrev={handleClickPrev}
          />
          <Next
            className="absolute right-1 sm:right-5 md:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
            btnClassName="w-7 h-7 lg:w-12 lg:h-12 hover:border-slate-400 dark:hover:border-slate-400"
            svgSize="w-4 h-4 lg:w-6 lg:h-6 stroke-white"
            onClickNext={handleClickNext}
          />

          <div className="px-3 lg:px-0">
            <img
              onClick={() => {
                history.push(`/brand/${btoa(item.merchant_user_id)}`);
              }}
              className="w-full h-full"
              style={{
                height: `${!isMobile ? "180px" : "100%"}`,
              }}
              src={item.image_url}
              alt={"img"}
            />
          </div>
        </div>
      </>
    );
  };

  return <>{navBar?.map((_: any, index: any) => renderItem(index))}</>;
};

export default SectionHero2;
