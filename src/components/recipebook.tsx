// Import deps
import React, { useEffect, useState } from "react";
import axios from "axios";

// Import components
import { RecipeBookList } from "./recipebook-list";

// Import styles
import "./../styles/recipebook.css";

// Create RecipeBook component
export const RecipeBook = () => {
  // Prepare states
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all recipe on initial render
  useEffect(() => {
    fetchRecipe();
  }, []);

  // Fetch all recipe
  const fetchRecipe = async () => {
    // Send GET request to 'recipe/all' endpoint
    axios
      .get("http://localhost:4001/recipe/all")
      .then((response) => {
        // Update the recipe state
        setRecipe(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the recipe list: ${error}`)
      );
  };

  // Reset all input fields
  const handleInputsReset = () => {
    setAuthor("");
    setTitle("");
    setTime("");
    setDescription("");
  };

  // Create new book
  const handleRecipeCreate = () => {
    // Send POST request to 'recipe/create' endpoint
    axios
      .post("http://localhost:4001/recipe/create", {
        author: author,
        title: title,
        time: time,
        description: description,
      })
      .then((res) => {
        console.log(res.data);

        // Fetch all recipe to refresh
        // the recipe on the RecipeBook list
        fetchRecipe();
      })
      .catch((error) =>
        console.error(
          `There was an error creating the ${title} recipe: ${error}`
        )
      );
  };

  // Submit new book
  const handleRecipeSubmit = () => {
    // Check if all fields are filled
    if (
      author.length > 0 &&
      title.length > 0 &&
      time.length > 0 &&
      description.length > 0
    ) {
      // Create new book
      handleRecipeCreate();

      console.info(`Recipe ${title} by ${author} added.`);

      // Reset all input fields
      handleInputsReset();
    }
  };

  // Remove book
  const handleRecipeRemove = (id: number, title: string) => {
    // Send PUT request to 'recipe/delete' endpoint
    axios
      .put("http://localhost:4001/recipe/delete", { id: id })
      .then(() => {
        console.log(`Recipe ${title} removed.`);

        // Fetch all recipe to refresh
        // the recipe on the RecipeBook list
        fetchRecipe();
      })
      .catch((error) =>
        console.error(
          `There was an error removing the ${title} recipe: ${error}`
        )
      );
  };

  // Reset book list (remove all recipe)
  const handleListReset = () => {
    // Send PUT request to 'recipe/reset' endpoint
    axios
      .put("http://localhost:4001/recipe/reset")
      .then(() => {
        // Fetch all recipe to refresh
        // the recipe on the RecipeBook list
        fetchRecipe();
      })
      .catch((error) =>
        console.error(`There was an error resetting the recipe list: ${error}`)
      );
  };

  return (
    <div className="book-list-wrapper">
      {/* Form for creating new book */}
      <div className="book-list-form">
        <div className="form-wrapper" onSubmit={handleRecipeSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="title">
                Enter title:
              </label>
              <input
                className="form-input"
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="author">
                Enter author:
              </label>
              <input
                className="form-input"
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.currentTarget.value)}
              />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="time">
                Enter time:
              </label>
              <input
                className="form-input"
                type="text"
                id="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.currentTarget.value)}
              />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="description">
                Enter description:
              </label>
              <input
                className="form-input"
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </fieldset>
          </div>
        </div>

        <button onClick={handleRecipeSubmit} className="btn btn-add">
          Add the recipe
        </button>
      </div>

      {/* Render RecipeBook list component */}
      <RecipeBookList
        recipe={recipe}
        loading={loading}
        handleRecipeRemove={handleRecipeRemove}
      />

      {/* Show reset button if list contains at least one book */}
      {recipe.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>
          Reset recipe list.
        </button>
      )}
    </div>
  );
};

