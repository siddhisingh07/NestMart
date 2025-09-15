import { banner_bottom } from '../../Assets/Assets'

const BottomBanner = () => {
  return (
   <>
     <div className="min-h-96 w-full bg-gray-50 flex items-center justify-center px-3 md:px-10 lg:px-28 py-2">
           <div
             className="h-[60vh] relative md:h-[65vh] lg:h-[75vh] w-full containerBannerBottom rounded bg-cover flex items-start py-2 md:py-18 lg:py-32 flex-col px-6 md:px-16  lg:px-32"
           >
             <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#253d4e] font-semibold leading-11 lg:leading-none  bg-red ">
               Stay home &amp; get your daily <br/>  needs from our shop 
             </h1>
             {/* <h1 className="text-7xl text-[#253d4e] font-bold"></h1> */}
             <h3 className="text-xl lg:text-xl  text-gray-400 font-light  mt-4 lg:mt-6">
              Start Your Daily Shopping with <span class="text-green">Nest Mart</span>
             </h3>
             <div className=" rounded-full w-72 md:w-96 lg:w-[30rem] mt-10 flex bg-slate-50">
               <input
                 type="text"
                 className="bg-transparent text-gray-600 h-full w-full lg:px-8 px-4 px py-2 lg:py-5 rounded-full focus:border-none focus:outline-none placeholder:text-lg placeholder:font-normal"
                 placeholder="Your email address"
               />
               <button className="py-4 px-8 rounded-full bg-[#3bb77e] text-gray-50 text-lg">
                 Suscribe
               </button>
             </div>
              <img src={banner_bottom} className='w-[35rem] h-[30rem] object-contain object-center absolute bottom-[-5.4rem] right-0' alt="" />
           </div>
           
         </div>
   </>
  )
}

export default BottomBanner