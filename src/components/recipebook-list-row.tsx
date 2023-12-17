// Import deps
import React from "react";

// Create interfaces
interface RecipeBookListRowUI {
  position: number;
  book: {
    id: number;
    author: string;
    title: string;
    time: string;
    description: string;
  };
  handleRecipeRemove: (id: number, title: string) => void;
}

// Create RecipeBookListRow component
export const RecipeBookListRow = (props: RecipeBookListRowUI) => (
  <tr className="table-row">
    <td className="table-item">{props.position}</td>

    <td className="table-item">{props.book.title}</td>

    <td className="table-item">{props.book.author}</td>

    <td className="table-item">{props.book.time}</td>

    <td className="table-item">{props.book.description}</td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() =>
          props.handleRecipeRemove(props.book.id, props.book.title)
        }
      >
        Remove recipe
      </button>
    </td>
  </tr>
);

