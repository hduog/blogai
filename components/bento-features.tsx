import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  BellIcon,
  GlobeIcon,
  InputIcon,
  CopyIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";

const features = [
  {
    Icon: CopyIcon,
    name: "AI-Powered Blog Generation",
    description: "Generate high-quality blog articles instantly with AI.",
    href: "/login",
    cta: "Try it now",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Smart Content Input",
    description: "Just provide a topic or keyword. We'll handle the rest.",
    href: "/login",
    cta: "Try it now",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multi-language Support",
    description: "Generate blog posts in 100+ languages with AI.",
    href: "/login",
    cta: "Try it now",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: BookmarkIcon,
    name: "Export as HTML & Tailwind CSS",
    description: "Instantly get ready-to-use HTML + Tailwind blog layout.",
    href: "/login",
    cta: "Try it now",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Automatic Publishing",
    description: "Schedule and publish AI-written posts effortlessly.",
    href: "/login",
    cta: "Try it now",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export async function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
