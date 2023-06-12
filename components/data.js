import React from "react";
import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/img/benefit-one.png";

const benefitOne = {
  title: "Benefits of Joining DevHub",
  desc: "Discover the advantages of being part of DevHub's developer community.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Connect with Like-minded Developers",
      desc: "Engage with a vibrant community of developers who share similar interests and goals.",
      icon: <FaceSmileIcon className="h-6 w-6" />,
    },
    {
      title: "Expand Your Knowledge",
      desc: "Access a wealth of resources, tutorials, and workshops to enhance your skills online.",
      icon: <ChartBarSquareIcon className="h-6 w-6" />,
    },
    {
      title: "Discover New Opportunities",
      desc: "Stay informed about latest events.",
      icon: <CursorArrowRaysIcon className="h-6 w-6" />,
    },
  ],
};

export { benefitOne };
