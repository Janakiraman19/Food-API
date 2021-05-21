import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe'
import Footer from './footer'

const App =()=> {
  const APP_ID="897e56db";
  const APP_KEY="62dd4aa4d253f48a4b35fe698a1ba72a";
  
  
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const[query,setQuery]=useState("chicken");

  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes=async()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    
    setRecipes(data.hits);
  };

  const updateSearch = e =>{
    setSearch(e.target.value)
    console.log(search);
  };
  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
  }

  return (
    
    <div className="App">
      
      <p className="tit">Food search api</p>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text"value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit" >Search</button>
      </form>
      <div class="recipe">
      {recipes.map(recipe=>(
        <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      
      </div>
      <Footer/>
    </div>
    
  );
}

export default App;
