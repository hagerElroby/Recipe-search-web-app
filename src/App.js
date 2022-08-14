import Recipes from "./Recipes";
import "./App.css";
import React, { useEffect,useState } from "react";

const App = () =>{
  const APP_ID = "1ed1e3a0";
  const APP_KEY = "0b801416d7bf8e7c5dcc7303b28164e9";
  

  const [recipes , setRecipes] = useState([]);
  const [search , setSearch] =useState("");
  const [query , setQuery] = useState('chicken');


  useEffect( () => {
    getRecipes();
  } ,[]);


  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return(
    <div className="app">
      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        type="text"
        value={search}
        onChange = {updateSearch}
        />
        <button className="search-button" type="submit">search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipes
        key= {recipe.recipe.label}
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))
      }
      </div>
    </div>
  )
}
export default App;
