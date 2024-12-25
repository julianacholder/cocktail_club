import React, { useState, useEffect } from 'react';
import "../assets/css/tabs.css";

const Tab = () => {
  const [activeTab, setActiveTab] = useState('Random');
  const [cocktails, setCocktails] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null); // New state for selected drink details

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedDrink(null); // Reset the selected drink when switching tabs
  };

  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink); // Set the selected drink for showing details
  };

  const randomCocktailNames = [
    'Margarita',
    'Martini',
    'Mojito',
    'Daiquiri',
    'Old Fashioned',
    'Whiskey Sour',
    'Negroni',
    'Mai Tai',
    'Cosmopolitan',
  ];

  const newCocktailNames = [
    'Pina Colada',
    'Blue Lagoon',
    'Long Island Tea',
    'French 75',
    'Aperol Spritz',
    'Gin Fizz',
    'Sea Breeze',
    'Zombie',
    'Caipirinha',
  ];

  const mostPopularCocktailNames = [
    'Bloody Mary',
    'Manhattan',
    'Tequila Sunrise',
    'Screwdriver',
    'Bellini',
    'Tom Collins',
    'Sidecar',
    'Cuba Libre',
    'White Russian',
  ];

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        let cocktailList = [];
        if (activeTab === 'Random') {
          cocktailList = randomCocktailNames;
        } else if (activeTab === 'NewCocktails') {
          cocktailList = newCocktailNames;
        } else if (activeTab === 'mostPopular') {
          cocktailList = mostPopularCocktailNames;
        }

        const promises = cocktailList.map((name) =>
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
            .then((response) => response.json())
            .then((data) => (data.drinks ? data.drinks[0] : null))
        );

        const drinks = await Promise.all(promises);
        setCocktails(drinks.filter((drink) => drink !== null));
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchCocktails();
  }, [activeTab]);

  return (
    
    <div className="tab-container">
      
      {/* Tabs */}
      <div className="tabs">
        <div className="shift">
        <div
          className={`tab ${activeTab === 'Random' ? 'active' : ''}`}
          onClick={() => handleTabClick('Random')}
          id='random'
        >
          Random
        </div>
        <div
          className={`tab ${activeTab === 'NewCocktails' ? 'active' : ''}`}
          onClick={() => handleTabClick('NewCocktails')}
          id='new'
        >
          New Cocktails
        </div>
        </div>
        <div
          className={`tab ${activeTab === 'mostPopular' ? 'active' : ''}`}
          onClick={() => handleTabClick('mostPopular')}
          id='most'
        >
          Most Popular
        </div>
      </div>

      {/* Drink Details View */}
      {selectedDrink ? (
        <div className="cocktail-details">
          <h2>{selectedDrink.strDrink}</h2>
          <img
            src={selectedDrink.strDrinkThumb}
            alt={selectedDrink.strDrink}
            style={{ width: '300px', height: '300px', borderRadius: '8px' }}
          />
          <h3>Category: {selectedDrink.strCategory}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {Array.from({ length: 15 }).map((_, index) => {
              const ingredient = selectedDrink[`strIngredient${index + 1}`];
              const measure = selectedDrink[`strMeasure${index + 1}`];
              return ingredient ? (
                <li key={index}>
                  {measure ? `${measure} ` : ''} {ingredient}
                </li>
              ) : null;
            })}
          </ul>
          <h4>Instructions:</h4>
          <p>{selectedDrink.strInstructions}</p>
          <button onClick={() => setSelectedDrink(null)} className="back-button">
            ← Back
          </button>
        </div>
      ) : (
        // Cocktail Grid View
        <div className="tab-content">
          <div className="cocktail-grid">
            {cocktails.map((drink) => (
              <div
                key={drink.idDrink}
                className="cocktail-item"
                onClick={() => handleDrinkClick(drink)} 
                style={{ cursor: 'pointer' }}
              >
                <img
                className='drink-image'
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                 
                />
                <p>{drink.strDrink}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab;




