import { cat_1,  cat_2, cat_3, cat_4, cat_5, cat_6, cat_7, cat_8, img,} from "../../Assets/Assets";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Heading from "../Common/Heading";
import { HeadingClass } from "../PropsClass";
import axios from "axios";
import { base_url } from "../../constant";
import { useEffect, useState } from "react";
import Card from "../Sample/Card";
import { CategorySkeleton } from "../Sample/CategorySkeleton";

const Categories = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState(null);
  const [category, setCategory] = useState([])
  function getRandomPastelColor() {
    const r = Math.floor(150 + Math.random() * 90); // 150-255 for light shades
    const g = Math.floor(150 + Math.random() * 90);
    const b = Math.floor(150 + Math.random() * 90);
    return `rgb(${r},${g},${b},0.18)`; // 0.13 = transparency
  }

  const handleSubmit = (category) => {
    navigate(`/products/${category}`);
  };

  let images = [cat_3,  cat_2, cat_1, cat_4, cat_5, cat_6, cat_7, cat_8, cat_2]

  const handleData = async () => {
    try {
      let res = await axios.get(`${base_url}/users/category`);
      setCategoryList(res.data.data);
      console.log(res.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  useEffect(()=>{
   if(categoryList){
      let category = categoryList.map((obj, idx)=>({
      ...obj,
      img : images[idx% images.length]
    }))
    setCategoryList(category)
   }
  }, [categoryList])

  return (
    <div className="w-ful px-3 md:px-10 lg:px-28 bg-gray-50 py-4">
      <Heading
        value={new HeadingClass("Featured Categories", "start", 72, 20)}
      />
      <div className="flex whitespace-nowrap overflow-x-auto overflow-y-hidden gap-4 scrollbar">
        {categoryList == null ? (
          [...Array(10)].map((_, i)=> <CategorySkeleton key={i}/>)
        
        ) : (
          categoryList.map((item, idx) => {
            return (
              <div
                key={idx}
                className="py-6 px-2 rounded flex items-center flex-col flex-shrink-0 w-44 md:w-52 lg:w-32  hover:border hover:border-green hover:shadow-md cursor-pointer transition-all duration-200"
                style={{ backgroundColor: getRandomPastelColor() }}
                onClick={() => {
                  handleSubmit(item.category);
                }}
              >
                <img
                  src={item.img}
                  alt="category_image"
                  className="h-24 lg:h-20 bg-cover mb-2 lg:mb-4 hover:scale-105 duration-500 transition-all"
                />
                <h2 className="text-xl lg:text-sm text-center font-bold text-gray-900">
                  {item.category}
                </h2>
                <p className="text-center text-gray-400 text-lg lg:text-xs">
                  {item.items} items
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Categories;
