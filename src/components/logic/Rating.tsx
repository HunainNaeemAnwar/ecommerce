import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function getStarRating(rating: any): React.ReactNode {
  // Validate the rating input
  if (typeof rating !== "number" || isNaN(rating) || rating < 0 || rating > 5) {
    return React.createElement(
      "span",
      null,
      "Invalid rating. Please provide a number between 0 and 5."
    );
  }

  // Calculate the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(rating); // Full stars (integer part)
  const hasHalfStar = rating % 1 >= 0.5; // Check for half-star

  // Define the components for full star and half star
  const FullStar = React.createElement(FaStar, {
    className: "w-4 h-4 text-yellow-500",
  });

  const HalfStar = React.createElement(FaStarHalfAlt, {
    className: "w-4 h-4 text-yellow-500",
  });

  // Generate the elements for the stars
  const starElements: React.ReactNode[] = [];
  for (let i = 0; i < fullStars; i++) {
    starElements.push(React.cloneElement(FullStar, { key: `full-${i}` }));
  }
  if (hasHalfStar) {
    starElements.push(React.cloneElement(HalfStar, { key: "half" }));
  }

  return React.createElement(
    "div",
    { className: "flex items-center space-x-1" },
    ...starElements
  );
}
