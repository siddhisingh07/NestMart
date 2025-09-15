import React from 'react'
import Home from './Home'
import Categories from './GeneralPages/Categories'
import BestSellers from './GeneralPages/BestSellers'
import Analysis from './GeneralPages/Analysis'
import BottomBanner from './GeneralPages/BottomBanner'
import FooterBlocks from './GeneralPages/FooterBlocks'

export const Start = () => {
  return (
    <>
    <Home/>
    <Categories/>
    <BestSellers/>
    <Analysis/>
    <BottomBanner/>
    <FooterBlocks/>
    </>
  )
}
