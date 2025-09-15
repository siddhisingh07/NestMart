import { useEffect, useRef, useState } from "react";

const Heading = ({ value }) => {
  let h1Ref = useRef(null);
  const [width, setwidth] = useState(0);
  useEffect(() => {
    if (h1Ref.current) {
      let width = Math.floor(h1Ref.current.getBoundingClientRect().width);
      setwidth(width + 20);
    }
  }, []);
  return (
    <>
      <div className={`flex items-${value.position} flex-col `}>
        <h1
          ref={h1Ref}
          className="text-navy text-3xl font-semibold mb-2 lg:mb-3 inline-block"
        >
          {value.text}
        </h1>
        <div
          className={` border border-gray-200 lg:border relative mb-5`}
          style={{ width: `${width}px` }}
        >
          <span
            className={`bg-green h-[.18rem] left-0 absolute top-[-1px] inline-block  rounded`}
            style={{ width: `${width / 3}px` }}
          ></span>
        </div>
      </div>
    </>
  );
};

export default Heading;
