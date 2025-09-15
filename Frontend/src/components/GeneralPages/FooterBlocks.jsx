import { FaFire, FaMoneyCheckAlt } from "react-icons/fa";
import { background } from "../../Assets/Assets";
import { FaBus, FaClock } from "react-icons/fa6";

const FooterBlocks = () => {
  let blocksArr = [
    {
      title: "Get daily deals",
      subtitle: "When you signup",
      icon: <FaFire className="text-3xl text-gray-500" />,
    },
    {
      title: "Secure Payments",
      subtitle: "Trusted worldwide",
      icon: <FaMoneyCheckAlt className="text-3xl text-gray-500" />,
    },
    {
      title: "24/7 Support",
      subtitle: "We’re here to help",
      icon: <FaClock className="text-3xl text-gray-500" />,
    },
    {
      title: "Fast Delivery",
      subtitle: "On all orders",
      icon: <FaBus className="text-3xl text-gray-500" />,
    },
  ];

  return (
    <div className="px-3 md:px-10 lg:px-28 py-4 flex gap-2 lg:gap-6 flex-col lg:flex-row">
      {blocksArr.map((block, i) => (
        <div
          key={i}
          className="shadow w-full lg:w-1/4 py-5 flex items-center justify-center gap-6"
          style={{ backgroundImage: `url(${background})` }}
        >
          {block.icon}
          <div>
            <h1 className="text-navy font-semibold text-lg leading-none">
              {block.title}
            </h1>
            <h2 className="text-base text-gray-400 font-light">
              {block.subtitle}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterBlocks;
