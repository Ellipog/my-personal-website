declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        scrollamount?: string | number;
        direction?: string;
        behavior?: string;
      },
      HTMLElement
    >;
  }
}
