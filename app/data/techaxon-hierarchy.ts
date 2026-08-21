import type { HierarchyConnection, HierarchyItem } from "../components/hierarchy-flow";

export const techaxonHierarchy: HierarchyItem = {
  id: "techaxon",
  label: "Techaxon",
  children: [
    {
      id: "products",
      label: "Products",
      children: [
        {
          id: "kanban",
          label: "Kanban",
          children: [
            { id: "subscriptions", label: "Subscriptions" },
            { id: "licenses", label: "Licenses" },
          ],
        },
        { id: "lms", label: "LMS" },
        { id: "iam", label: "IAM" },
      ],
    },
    {
      id: "services",
      label: "Services",
      children: [
        { id: "web-development", label: "Web Development" },
        { id: "consulting", label: "Consulting" },
      ],
    },
  ],
};

export const techaxonConnections: HierarchyConnection[] = [
  { source: "iam", target: "kanban" },
  { source: "iam", target: "lms" },
];
