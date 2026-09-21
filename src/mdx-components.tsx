import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

/**
 * Global MDX element map — every article body inherits the site's
 * typographic voice: Fraunces display headings, mist body text, brand links.
 */
const components = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 mb-5 font-display text-[1.9rem] leading-[1.08] font-semibold tracking-[-0.03em] text-mist-100 text-balance-pretty first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-9 mb-4 font-display text-[1.35rem] leading-[1.15] font-semibold tracking-[-0.02em] text-mist-100 text-balance-pretty"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-7 mb-3 text-[1.05rem] leading-snug font-semibold tracking-tight text-mist-100"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-6 text-[1.02rem] leading-[1.85] text-mist-300"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-medium text-brand-400 underline decoration-brand-400/40 underline-offset-[3px] transition-colors hover:text-brand-300 hover:decoration-brand-300"
        {...props}
      >
        {children}
      </a>
    );
  },
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-mist-100" {...props}>
      {children}
    </strong>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-6 list-none space-y-3 pl-1 text-[1.02rem] leading-[1.8] text-mist-300"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-6 list-decimal space-y-3 pl-6 text-[1.02rem] leading-[1.8] text-mist-300 marker:font-mono marker:text-[0.85em] marker:text-brand-400 [&>li>span.mdx-bullet]:hidden"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="relative pl-7" {...props}>
      <span
        aria-hidden
        className="mdx-bullet absolute top-[0.72em] left-1 h-1.5 w-1.5 bg-brand-400"
      />
      {children}
    </li>
  ),
  blockquote: ({
    children,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="surface my-8 border-l-2! border-l-brand-400 px-6 py-5"
      {...props}
    >
      <div className="font-display text-[1.15rem] leading-relaxed text-mist-100 italic [&>p]:mb-0">
        {children}
      </div>
    </blockquote>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="surface scrollbar-none my-8 overflow-x-auto px-5 py-4 font-mono text-[0.85rem] leading-relaxed text-mist-100"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-sm bg-mist-100/10 px-1.5 py-0.5 font-mono text-[0.85em] text-brand-300"
      {...props}
    >
      {children}
    </code>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-10 border-t border-mist-100/15"
      {...props}
    />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="surface scrollbar-none my-8 overflow-x-auto">
      <table className="w-full min-w-[34rem] text-left text-[0.95rem]" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <thead
      className="border-b border-mist-100/15 font-mono text-[0.72rem] tracking-[0.14em] text-mist-400 uppercase"
      {...props}
    >
      {children}
    </thead>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <th className="px-5 py-3.5 font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <td
      className="border-t border-mist-100/8 px-5 py-3.5 leading-relaxed text-mist-300"
      {...props}
    >
      {children}
    </td>
  ),
  img: ({
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      loading="lazy"
      className={cn("my-8 w-full rounded-md border border-mist-100/12")}
      {...props}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
