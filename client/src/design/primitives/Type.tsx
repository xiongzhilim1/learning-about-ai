/**
 * Type — composable typography primitives. Encapsulates font-family,
 * weight, tracking, and line-height per role so no component makes
 * inline font decisions.
 *
 * Roles: display, heading, subhead, body, lede, eyebrow, mono, caption.
 * Implementation lands in step 3. Spec: Part 5, primitives.
 */

import type { ElementType, ReactNode } from "react";

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

// Skeleton components: static passthroughs until step 3.
function make(role: TypeRole, defaultTag: ElementType) {
  function TypeComponent({ as, className, children }: TypeProps) {
    const Tag = as ?? defaultTag;
    return <Tag className={className}>{children}</Tag>;
  }
  TypeComponent.displayName = `Type.${role}`;
  return TypeComponent;
}

export const Type = {
  Display: make("display", "h1"),
  Heading: make("heading", "h2"),
  Subhead: make("subhead", "h3"),
  Body: make("body", "p"),
  Lede: make("lede", "p"),
  Eyebrow: make("eyebrow", "span"),
  Mono: make("mono", "code"),
  Caption: make("caption", "span"),
};
