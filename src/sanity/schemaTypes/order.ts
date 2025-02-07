import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
    }),

    defineField({
      name: "id",
      title: "ID",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
    }),
    defineField({
      name: "method",
      title: "Payment Method",
      type: "string",
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
    }),

    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "color", type: "string", title: "Color" },
            { name: "size", type: "string", title: "Size" },
            { name: "title", type: "string", title: "Title" },
            { name: "quantity", type: "number", title: "Quantity" },
          ],
        },
      ],
      title: "Items",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "postalCode",
      title: "Postal Code",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
  ],
});
