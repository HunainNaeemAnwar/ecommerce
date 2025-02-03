const hero = {
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The main title for the hero section.",
    },
    {
      name: "description",
      title: "description",
      type: "string",
      description: "A brief description for the hero section.",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "The main image for the hero section.",
      options: {
        hotspot: true, // Enables image cropping and focal point selection
      },
    },
  ],
};
export default hero;
