import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const API_KEY = "9943aa49b1da46a1a23d33048e86e687";

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-img" />
      <h3>Ingredients</h3>
      <ul>
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
    </div>
  );
}

export default RecipeDetail;
