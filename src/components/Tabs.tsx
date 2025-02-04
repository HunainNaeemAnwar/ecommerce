"use client";
import React, { useState } from "react";
import ReviewForm from "./ReviewForm";

interface Detail {
  weight?: number;
  warranty?: string;
  return?: string;
  care?: string;
  lifespan?: string;
  available?: boolean;
  origin?: string;
}
interface faq {
  question: string;
  answer: string;
}

interface Review {
  userName: string;
  reviewDate: string;
  comment: string;
  rating: number;
}

interface TabsContentProps {
  details: Detail[];
  faqs: faq[];
  reviews?: Review[]; // Making reviews prop optional
}

const TabsContent: React.FC<TabsContentProps> = ({
  details,
  faqs,
  reviews = [],
}) => {
  // Default to empty array if no reviews are passed
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className=" px-4 lg:px-10">
      {/* Tab Navigation */}
      <div className="grid grid-cols-3 border-b-2  border-black border-opacity-30">
        {["Product Details", "Rating & Reviews", "FAQs"].map((tab, index) => (
          <button
            key={index}
            className={`tab-button px-4 py-2 md:text-[20px] text-sm font-Satoshi lg:text-lg ${
              activeTab === index
                ? "border-b-2 border-black font-Satoshi"
                : "opacity-60 font-Satoshi"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 0 && (
          <ul className="font-Satoshi text-sm flex flex-col gap-3  list-disc  p-6 xl:p-16">
            {details.map((item, index) => (
              <React.Fragment key={index}>
                {item?.origin && (
                  <li>
                    <strong>Origin:</strong> {item.origin}
                  </li>
                )}
                {item?.weight && (
                  <li>
                    <strong>Weight:</strong> {item.weight}
                  </li>
                )}
                {item?.warranty && (
                  <li>
                    <strong>Warranty:</strong> {item.warranty}
                  </li>
                )}
                {item?.return && (
                  <li>
                    <strong>Return Policy:</strong> {item.return}
                  </li>
                )}
                {item?.lifespan && (
                  <li>
                    <strong>Product Lifespan:</strong> {item.lifespan}
                  </li>
                )}
                {item?.care && (
                  <li>
                    <strong>Care Instructions:</strong> {item.care}
                  </li>
                )}
                {item?.available !== undefined && (
                  <li>
                    <strong>Availability:</strong>{" "}
                    {item.available ? (
                      <span className="text-green-500">Available</span>
                    ) : (
                      <span className="text-red-500">Not Available</span>
                    )}
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        )}

        {activeTab === 1 && (
          <div>
            {/* Pass reviews prop to ReviewForm */}
            <ReviewForm reviews={reviews} />
          </div>
        )}
        {activeTab === 2 && (
          <ul className="font-Satoshi text-sm  flex flex-col gap-4  p-2 xl:p-16">
            {faqs.map((faq, index) => (
              <li key={index}>
                {faq?.question && (
                  <p className="mb-3  ">
                    <strong>Q{index + 1}:</strong> {faq.question}
                  </p>
                )}
                {faq?.answer && <p className="text-blue-500">{faq.answer}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TabsContent;
