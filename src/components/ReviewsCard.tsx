import React from "react";
import getStarRating from "@/components/logic/Rating"; // Assuming getStarRating is the function for displaying stars.
import formatDate from "@/components/logic/DateFormater";

interface ReviewCardProps {
  userName: string;
  rating: number;
  reviewDate: string;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  rating,
  reviewDate,
  comment,
}) => {
  return (
    <div className="p-4 border border-opacity-30 border-black rounded-2xl shadow-sm flex flex-col gap-2 justify-start items-start">
      <span>{rating ? getStarRating(rating) : "No rating available"}</span>
      <div className="font-Poppins font-medium text-lg capitalize">
        {userName || "Anonymous User"}
      </div>
      <div
        className="text-base opacity-80 font-Satoshi break-words overflow-hidden"
        style={{
          wordWrap: "break-word", // Ensures long words break into the next line
          overflowWrap: "break-word", // Provides fallback for legacy browsers
          maxWidth: "100%", // Ensures the content stays within the card's width
        }}
      >
        {comment ? `"${comment}"` : "No comment available"}
      </div>
      <div className="text-sm opacity-60 mt-2 font-Satoshi capitalize">
        {reviewDate
          ? `Posted On ${formatDate(reviewDate)}`
          : "Date not available"}
      </div>
    </div>
  );
};

export default ReviewCard;
