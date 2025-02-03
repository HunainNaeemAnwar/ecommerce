import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Keep the title relative to product",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .length(4)
          .error("Exactly 4 images are required for each product"),
      description: "Upload exactly 4 product images",
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
      description: "Add available color names for the product",
      validation: (Rule) =>
        Rule.required().min(1).error("At least one color is required"),
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      description: "Add available size  for the product",
      validation: (Rule) =>
        Rule.required().min(1).error("At least one size is required"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "oldprice",
      title: "Old Price",
      type: "number",
    }),
    defineField({
      name: "ratings",
      title: "Ratings",
      type: "number",
      description: "Ratings must be equal or below 5",
      validation: (Rule) =>
        Rule.required().min(0).max(5).error("Rating must be between 0 and 5"),
    }),
    defineField({
      name: "details",
      title: "Product Details",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "origin",
              title: "Oringin",
              type: "string",
            },
            {
              name: "weight",
              title: "Weight",
              type: "number",
            },
            {
              name: "care",
              title: "care_instructions",
              type: "string",
            },
            {
              name: "warranty",
              title: "Warranty",
              type: "string",
            },
            {
              name: "Lifespan",
              title: "product_lifespan",
              type: "string",
            },
            {
              name: "return",
              title: "return_policy",
              type: "string",
            },
            {
              name: "available",
              title: "Availability",
              type: "boolean",
            },
          ],
        },
      ],
      description: "Add detailed features and specifications of the product",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: "Frequently asked questions about the product",
    }),
    defineField({
      name: "reviews",
      title: "Product Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "userName",
              title: "User Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },

            {
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .max(5)
                  .error("Rating must be between 1 and 5"),
            },
            {
              name: "comment",
              title: "Review Comment",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "reviewDate",
              title: "Review Date",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
    }),
  ],
});
