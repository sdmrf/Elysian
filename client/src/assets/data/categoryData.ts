import { Category } from "../../types/types";
import { ForkKnife } from "@phosphor-icons/react";
import { createIcon } from "./icons";

const categories: Category[] = [
  {
    icon: createIcon(24),
    heading: "Home",
    desc: "Explore stylish and elegant home decor",
    link: "/home",
    products: 210,
  },
  {
    icon: createIcon(24),
    heading: "Bedroom",
    desc: "Find the perfect furnishings for your bedroom",
    link: "/bedroom",
    products: 150,
  },
  {
    icon: createIcon(24),
    heading: "Living Room",
    desc: "Discover elegant furnishings for your living room",
    link: "/living-room",
    products: 240,
  },
  {
    icon: createIcon(24),
    heading: "Kitchen",
    desc: "Explore stylish and functional kitchen decor",
    link: "/kitchen",
    products: 95,
  },
  {
    icon: createIcon(24),
    heading: "Office",
    desc: "Find the perfect office furnishings",
    link: "/office",
    products: 240,
  },
  {
    icon: createIcon(24),
    heading: "Outdoor",
    desc: "Discover elegant outdoor furniture",
    link: "/outdoor",
    products: 80,
  }
];

export { categories };
