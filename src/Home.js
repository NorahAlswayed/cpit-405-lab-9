import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const API_KEY = "9943aa49b1da46a1a23d33048e86e687"; // مفتاحك هنا

  const searchRecipes = async () => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=10`
      );
      const data = await res.json();
      console.log("API Response:", data); // ← شوفي النتيجة في الـ Console
      setRecipes(data.results || []); // ← تأكدنا إن النتائج ما تكون undefined
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <h2> Recipe Finder</h2>
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchRecipes}>Search</button>

      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((r) => (
            <div key={r.id} className="recipe-card">
              <img src={r.image} alt={r.title} />
              <h4>{r.title}</h4>
              <Link to={`/recipe/${r.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
