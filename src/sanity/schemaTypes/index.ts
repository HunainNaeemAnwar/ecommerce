import { type SchemaTypeDefinition } from "sanity";
import hero from "./hero";
import Product from "./product";
import category from "./category";
import order from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, Product, category, order],
};
