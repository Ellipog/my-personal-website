/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";

interface MarqueeProps {
  scrollamount: number;
  direction?: string;
  behavior?: string;
  children: React.ReactNode;
}

export const Marquee = ({
  scrollamount,
  direction,
  behavior,
  children,
}: MarqueeProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <marquee
        scrollamount={scrollamount}
        direction={direction}
        behavior={behavior}
        className="my-2"
      >
        {children}
        {/* @ts-ignore */}
      </marquee>
    </>
  );
};
