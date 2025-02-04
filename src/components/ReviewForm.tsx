import React, { useState, useEffect, useRef } from "react";
import ReviewCard from "@/components/ReviewsCard";
import SortDropDown from "./SortDropDown";
import { Pencil } from "lucide-react";

export interface _Review {
  userName: string;
  rating: number;
  reviewDate: string;
  comment: string;
  source?: "api" | "local"; // Add source property to identify review origin
}

interface Review {
  userName: string;
  rating: number;
  reviewDate: string;
  comment?: string;
  source?: "api" | "local"; // Same as above
}

interface ReviewFormProps {
  reviews?: Review[]; // Make reviews optional
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  reviews: parentReviews = [],
}) => {
  const [reviews, setReviews] = useState<Review[]>(parentReviews);
  const [user, setUser] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(6);
  const [activeDeleteIndex, setActiveDeleteIndex] = useState<number | null>(
    null
  );
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch reviews from local storage
    const savedReviews = localStorage.getItem("reviews");
    const localReviews = savedReviews ? JSON.parse(savedReviews) : [];

    // Merge parent reviews with local storage reviews, ensuring no duplicates
    const mergedReviews = [
      ...parentReviews,
      ...localReviews.filter(
        (localReview: Review) =>
          !parentReviews.some(
            (parentReview) => parentReview.reviewDate === localReview.reviewDate
          )
      ),
    ].map((review) => ({ ...review, source: review.source || "local" })); // Add source to reviews

    setReviews(mergedReviews);

    // Add click event listener to close the form when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        isFormVisible
      ) {
        setIsFormVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [parentReviews, isFormVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5.");
      return;
    }

    const newReview: Review = {
      userName: user,
      rating,
      reviewDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      comment,
      source: "local", // This review comes from the local storage
    };

    // Check if the review already exists to avoid duplicates
    const isDuplicate = reviews.some(
      (review) => review.comment === newReview.comment
    );
    if (isDuplicate) {
      alert("This review already exists.");
      return;
    }

    const updatedReviews = [...reviews, newReview];
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);

    setRating(0);
    setComment("");
    setIsFormVisible(false);
    setUser("");
  };

  const handleSortChange = (order: "latest" | "oldest") => {
    setSortOrder(order);
  };

  const handleDeleteReview = (sortedIndex: number) => {
    const reviewToDelete = sortedReviews[sortedIndex];
    const originalIndex = reviews.findIndex(
      (review) => review.reviewDate === reviewToDelete.reviewDate
    );

    if (originalIndex === -1 || reviews[originalIndex].source === "api") {
      return;
    }

    const updatedReviews = reviews.filter((_, i) => i !== originalIndex);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setActiveDeleteIndex(null);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.reviewDate);
    const dateB = new Date(b.reviewDate);
    if (sortOrder === "latest") {
      return dateB.getTime() - dateA.getTime();
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });

  const handleLoadMore = () => {
    setVisibleReviewsCount(visibleReviewsCount + 2);
  };

  return (
    <div className="w-full relative mx-auto rounded-xl">
      {isFormVisible && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40"
            onClick={() => setIsFormVisible(false)}
          ></div>
          <div
            ref={formRef}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white p-6 w-72 shadow-xl md:w-96 rounded-lg z-50 transition-transform duration-300"
          >
            <h2 className="text-xl font-Integral mb-4">Submit Your Review</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col px-2 py-2 gap-6 font-Satoshi text-sm"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-Poppins mb-1 pl-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="border w-full py-1 md:py-2 pl-2 font-medium rounded-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-Poppins mb-1 font-medium pl-2"
                >
                  Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="border py-1 md:py-2 pl-2 rounded-md mt-1 w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-Poppins font-medium mb-1 pl-2"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  placeholder="Your Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border py-1 md:py-2 pl-2 rounded-md w-full"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white p-2 rounded-md mt-4"
              >
                Submit Review
              </button>
            </form>
          </div>
        </>
      )}

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-Satoshi text-sm lg:text-lg">
            All Reviews {`(${sortedReviews.length})`}
          </h3>
          <div className="flex items-center justify-between gap-2 md:gap-4 lg:gap-6">
            <div className="relative w-28 text-black rounded-full">
              <SortDropDown
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
              />
            </div>
            <div className="text-center">
              <button
                onClick={() => setIsFormVisible(true)}
                className="bg-black hidden sm:block text-white text-[16px] lg:text-sm font-Satoshi px-2 py-2 lg:px-4 lg:py-2 rounded-full"
              >
                Write a Review
              </button>
              <button
                onClick={() => setIsFormVisible(true)}
                className="bg-black text-white text-[16px] lg:text-sm font-Satoshi px-2 py-2 lg:px-4 lg:py-2 rounded-full"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {sortedReviews.length === 0 ? (
          <p className="text-center py-20 font-Satoshi text-base opacity-70">
            No reviews available.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-6">
            {sortedReviews
              .slice(0, visibleReviewsCount)
              .map((review, index) => (
                <div
                  key={index}
                  className="relative mb-4 border rounded-2xl shadow-sm"
                >
                  <ReviewCard
                    userName={review.userName}
                    rating={review.rating}
                    reviewDate={review.reviewDate}
                    comment={review.comment || ""}
                  />
                  <button
                    onClick={() =>
                      setActiveDeleteIndex(
                        activeDeleteIndex === index ? null : index
                      )
                    }
                    className="absolute top-6 right-6 text-gray-600 hover:text-red-500 transition-all duration-200 ease-in-out transform hover:scale-110"
                  >
                    •••
                  </button>

                  <div
                    className={`absolute top-8 right-12 bg-black shadow-lg rounded-sm transition-all duration-200 ease-in-out transform ${
                      activeDeleteIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <button
                      onClick={() => handleDeleteReview(index)} // Pass index to handleDeleteReview
                      className="text-white py-1 px-2 font-Satoshi transition-all duration-200 transform hover:scale-110 hover:rounded-md hover:bg-red-700"
                      disabled={reviews[index].source === "api"} // Disable delete for API reviews
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {sortedReviews.length > visibleReviewsCount && (
          <div className="mt-4 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
