export type ChartDefinition = {
  id: string;
  title: string;
  description: string;
};

export const charts: ChartDefinition[] = [
  {
    id: "techaxon",
    title: "Techaxon",
    description: "Products and services hierarchy.",
  },

   {
    id: "architecture",
    title: "System Architecture",
    description: "Overview of the Techaxon system architecture.",
  },

  // {
  //   id: "infrastructure",
  //   title: "Infrastructure",
  //   description: "Infrastructure and deployment overview.",
  // },
];