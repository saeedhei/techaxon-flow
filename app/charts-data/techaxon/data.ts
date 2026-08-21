import type {
  HierarchyConnection,
  HierarchyItem,
} from "@/app/components/hierarchy-flow";

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
        },
        {
          id: "lms",
          label: "LMS",
        },
        {
          id: "iam",
          label: "IAM",
          badge: "Open Source · Free",
        },
        {
          id: "telegram-bot",
          label: "Telegram Bot",
        },
      ],
    },
    {
      id: "services",
      label: "Services",
      children: [
        {
          id: "web-development",
          label: "Web Development",
        },
        {
          id: "consulting",
          label: "Consulting",
        },
      ],
    },
  ],
};

export const techaxonConnections: HierarchyConnection[] = [];