import React, { useState } from 'react';
import Tab from '../components/tab';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState(''); // To store the input value
  const [searchedCocktail, setSearchedCocktail] = useState(null); // To store the fetched cocktail
  const [error, setError] = useState(''); // To handle errors
  const [randomCocktail, setRandomCocktail] = useState(null); // To store random cocktail

  // Function to fetch cocktail based on search
  const fetchCocktail = async () => {
    if (!searchQuery.trim()) return; // Prevent empty search
    try {
      setError(''); // Clear previous error
      setRandomCocktail(null); // Clear any random cocktail
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await response.json();

      if (data.drinks) {
        setSearchedCocktail(data.drinks[0]); // Use the first drink in the result
      } else {
        setSearchedCocktail(null);
        setError('No cocktail found with that name.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
    }
    setSearchQuery(''); // Clear search bar after fetching
  };

  // Function to fetch a random cocktail
  const fetchRandomCocktail = async () => {
    try {
      setError(''); // Clear previous error
      setSearchedCocktail(null); // Clear searched cocktail
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      );
      const data = await response.json();

      if (data.drinks) {
        setRandomCocktail(data.drinks[0]); // Set the random cocktail
      }
    } catch (err) {
      setError('Error fetching a random cocktail. Please try again.');
    }
  };

  // Function to handle "Back" button
  const handleBack = () => {
    setSearchedCocktail(null); // Clear the searched cocktail
    setRandomCocktail(null); // Clear the random cocktail
    setError(''); // Clear any error message
  };

  return (
    <div className="recipe-main" id='recipes'>
      <div className="recipe-header">
        <h1>Recipes</h1>
        <p>The world's best cocktail resource</p>
      </div>

      {/* Search and Random Section */}
      <div className="recipe-menu">
        <div className="get" onClick={fetchRandomCocktail}>
          <p>Get Random cocktail</p>
          <h4>21+</h4>
        
        </div>
        <div className="search-cocktail">
          <hr />
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search Cocktail"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') fetchCocktail();
            }}
          />
          <button className="search-button" onClick={fetchCocktail}>
            Search
          </button>
        </div>
      </div>

      {/* Display Random Cocktail */}
      {randomCocktail && (
        <div className="cocktail-details">
          <h2>{randomCocktail.strDrink}</h2>
          <img
            src={randomCocktail.strDrinkThumb}
            alt={randomCocktail.strDrink}
            style={{ width: '300px', height: '300px', borderRadius: '8px' }}
          />
          <h3>Category: {randomCocktail.strCategory}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {Array.from({ length: 15 }).map((_, index) => {
              const ingredient = randomCocktail[`strIngredient${index + 1}`];
              const measure = randomCocktail[`strMeasure${index + 1}`];
              return ingredient ? (
                <li key={index}>
                  {measure ? `${measure} ` : ''} {ingredient}
                </li>
              ) : null;
            })}
          </ul>
          <h4>Instructions:</h4>
          <p>{randomCocktail.strInstructions}</p>
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
        </div>
      )}

      {/* Display Search Result */}
      {searchedCocktail && (
        <div className="cocktail-details">
          <h2>{searchedCocktail.strDrink}</h2>
          <img
            src={searchedCocktail.strDrinkThumb}
            alt={searchedCocktail.strDrink}
            style={{ width: '300px', height: '300px', borderRadius: '8px' }}
          />
          <h3>Category: {searchedCocktail.strCategory}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {Array.from({ length: 15 }).map((_, index) => {
              const ingredient = searchedCocktail[`strIngredient${index + 1}`];
              const measure = searchedCocktail[`strMeasure${index + 1}`];
              return ingredient ? (
                <li key={index}>
                  {measure ? `${measure} ` : ''} {ingredient}
                </li>
              ) : null;
            })}
          </ul>
          <h4>Instructions:</h4>
          <p>{searchedCocktail.strInstructions}</p>
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
        </div>
      )}

      {/* Display Error */}
      {error && (
        <div className="error-message">
          <h2>{error}</h2>
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
        </div>
      )}

      {/* Default Tab View */}
      {!searchedCocktail && !randomCocktail && !error && <Tab />}
    </div>
  );
};

export default Recipes;



