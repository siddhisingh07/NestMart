import { logo } from "../../Assets/Assets";
import { 
  BsHouseExclamation, 
  BsCart, 
  BsLightningCharge, 
  BsStar, 
  BsClockHistory,
  BsGeoAlt
} from "react-icons/bs";
import { MdDeliveryDining, MdEmail, MdPrivacyTip } from "react-icons/md";
import { FaFacebook, FaQq } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", icon: <BsHouseExclamation className="inline-block mr-2 text-gray-700"/> },
    { name: "All Products", icon: <BsCart className="inline-block mr-2 text-gray-700"/> },
    { name: "Hot Deals", icon: <BsLightningCharge className="inline-block mr-2 text-gray-700"/> },
    { name: "Best Selling Products", icon: <BsStar className="inline-block mr-2 text-gray-700"/> },
    { name: "Recently Added", icon: <BsClockHistory className="inline-block mr-2 text-gray-700"/> }
  ];

  const aboutCompany = [
    { name: "Ballia - 277401, UP , India", icon: <BsGeoAlt className="inline-block mr-2 text-gray-700"/> },
    { name: "nestmart@gmail.com", icon: <MdEmail className="inline-block mr-2 text-gray-700"/> },
    { name: "NestMart_Ballia", icon: <FaFacebook className="inline-block mr-2 text-gray-700"/> },
    { name: "Call us : +91 8879637102", icon: <IoCall className="inline-block mr-2 text-gray-700"/> },
    { name: "Hours 10:00 - 18:00, Mon - Sat", icon: <BsClockHistory className="inline-block mr-2 text-gray-700"/> }
  ];

  const accountLinks = [
    { name: "Login", icon: <BsHouseExclamation className="inline-block mr-2 text-gray-700"/> },
    { name: "Sign up", icon: <BsCart className="inline-block mr-2 text-gray-700"/> },
    { name: "Privacy Policy", icon: <MdPrivacyTip className="inline-block mr-2 text-gray-700"/> },
    { name: "FAQs", icon: <FaQq className="inline-block mr-2 text-gray-700"/> },
    { name: "Delivery Information", icon: <MdDeliveryDining className="inline-block mr-2 text-gray-700 "/> }
  ];

  const renderList = (items) => {
    return items.map((item, index) => (
      <li key={index} className="mb-1 flex items-center text-gray-600">
        {item.icon} {item.name}
      </li>
    ));
  };

  return (
    <div className="px-4 md:px-10 lg:px-28 bg-light_green pt-14 pb-8 gap-10">
   <div className="flex flex-col md:flex-col justify-between gap-10 lg:gap-5 lg:flex-row ">
       <div className="w-1/3 md:w-full lg:w-1/3 ">
        <img src={logo} alt="Logo" className="h-12" />
        <p className="w-full mt-4 text-gray-700">
          We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-10 lg:gap-12 md:gap-5">
        <div>
          <h1 className="text-navy font-semibold lg:mb-4 mb-3 text-xl">Quick Links</h1>
          <ul className="text-gray-700">{renderList(quickLinks)}</ul>
        </div>

        <div>
          <h1 className="text-navy font-semibold lg:mb-4 mb-3 text-xl">About Company</h1>
          <ul className="text-gray-700">{renderList(aboutCompany)}</ul>
        </div>

        <div>
          <h1 className="text-navy font-semibold lg:mb-4 mb-3 text-xl">Account</h1>
          <ul className="text-gray-700">{renderList(accountLinks)}</ul>
        </div>
      </div>
   </div>
   <hr  className="border-top border-gray-300 my-5" />
   <p className="text-center text-gray-700 font-light">Copyright 2025 © <Link className="text-green font-normal" to="/">Nest Mart</Link>  All Right Reserved.</p>
   <p className="text-base text-gray-700 text-center font-light">Developed by <Link className="text-green font-normal" to="https://www.linkedin.com/in/siddhi-singh07/">Siddhi Singh</Link></p>
    </div>
  );
};

export default Footer;
