// Import deps
import React from "react";

// Import components
import { RecipeBookListRow } from "./recipebook-list-row";

// Import styles
import "./../styles/recipebook-list.css";

// Create interfaces
interface RecipeUI {
  id: number;
  author: string;
  title: string;
  time: string;
  description: string;
}

interface RecipeBookListUI {
  recipe: RecipeUI[];
  loading: boolean;
  handleRecipeRemove: (id: number, title: string) => void;
}

// Create BookshelfList component
export const RecipeBookList = (props: RecipeBookListUI) => {
  // Show loading message
  if (props.loading) return <p>Leaderboard table is loading...</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-head-item" />

          <th className="table-head-item">Title</th>

          <th className="table-head-item">Author</th>

          <th className="table-head-item">Time</th>

          <th className="table-head-item">Description</th>

          <th className="table-head-item" />
        </tr>
      </thead>

      <tbody className="table-body">
        {props.recipe.length > 0 ? (
          props.recipe.map((book: RecipeUI, idx) => (
            <RecipeBookListRow
              key={book.id}
              book={book}
              position={idx + 1}
              handleRecipeRemove={props.handleRecipeRemove}
            />
          ))
        ) : (
          <tr className="table-row">
            <td
              className="table-item"
              style={{ textAlign: "center" }}
              colSpan={6}
            >
              There are no recipe to show. Create one!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

