/**
 * Type — composable typography primitives. Encapsulates font-family,
 * weight, tracking, and line-height per role so no component makes
 * inline font decisions. Roles mirror the shipped /digital-brain styles.
 *
 * Fonts come from the theme tokens in index.css (font-heading = Fraunces,
 * font-body = Source Sans 3, font-mono = Fira Code).
 */

import { createElement, type ElementType, type ReactNode } from "react";

export type TypeRole =
  | "display"
  | "heading"
  | "subhead"
  | "body"
  | "lede"
  | "eyebrow"
  | "mono"
  | "caption";

export interface TypeProps {
  /** Override the rendered element, e.g. as="h2". */
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

const roleClasses: Record<TypeRole, string> = {
  display:
    "font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.01em]",
  heading:
    "font-heading font-bold text-3xl md:text-4xl leading-[1.2] tracking-[-0.01em]",
  subhead: "font-heading font-semibold text-xl md:text-2xl leading-[1.3]",
  body: "font-body text-base leading-[1.7]",
  lede: "font-body text-lg md:text-xl leading-[1.7]",
  eyebrow:
    "font-body font-semibold text-xs uppercase tracking-[0.2em]",
  mono: "font-mono text-[0.8125rem] leading-[1.6]",
  caption: "font-body text-sm leading-[1.6] text-muted-foreground",
};

const defaultTags: Record<TypeRole, ElementType> = {
  display: "h1",
  heading: "h2",
  subhead: "h3",
  body: "p",
  lede: "p",
  eyebrow: "p",
  mono: "code",
  caption: "span",
};

function make(role: TypeRole) {
  function TypeComponent({ as, className, children }: TypeProps) {
    const Tag = as ?? defaultTags[role];
    const classes = className
      ? `${roleClasses[role]} ${className}`
      : roleClasses[role];
    // createElement, not JSX: R3F's JSX augmentation widens ElementType so
    // JSX children inference collapses to `never` for a polymorphic Tag.
    return createElement(Tag, { className: classes }, children);
  }
  TypeComponent.displayName = `Type.${role}`;
  return TypeComponent;
}

export const Type = {
  Display: make("display"),
  Heading: make("heading"),
  Subhead: make("subhead"),
  Body: make("body"),
  Lede: make("lede"),
  Eyebrow: make("eyebrow"),
  Mono: make("mono"),
  Caption: make("caption"),
};
