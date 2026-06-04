import { ArrowRight } from "lucide-react";

interface Props {
  sentence: string;
  linkText: string;
  href: string;
}

export default function CtaBand({ sentence, linkText, href }: Props) {
  return (
    <div
      className="py-10 px-6 rounded-lg"
      style={{
        background: "#F0EBE3",
        borderLeft: "3px solid #C75B39",
      }}
    >
      <p
        className="text-base md:text-lg mb-4"
        style={{
          color: "#3A3530",
          fontFamily: "'Source Sans 3', sans-serif",
          lineHeight: 1.7,
        }}
      >
        {sentence}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-medium no-underline group"
        style={{
          color: "#C75B39",
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {linkText}
        <ArrowRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}
