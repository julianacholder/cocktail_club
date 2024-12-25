import React from 'react'
import HeroPage from "./components/hero"
import Recipes from './components/Recipes'
import Header from './components/header'


const CocktailPage = () => {
  return (
    <div className='cocktail-main'>
     
      <HeroPage />
      <Recipes />
    </div>
  )
}

export default CocktailPage
