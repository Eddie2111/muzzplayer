import React from 'react';

import { cn } from '../../utils/cn';

export function TypographyHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn([
        "my-8 text-9xl hover:font-bold hover:underline hover:underline-offset-1 duration-200",
        className,
      ])}
    >
      {children}
    </p>
  );
}

export function TypographyLogo({
  // children,
  className,
}: {
  // children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn([
        "my-8 text-4xl hover:font-bold hover:underline hover:underline-offset-1 duration-200",
        className,
      ])}
    >
      <span className="my-8 text-4xl hover:font-bold hover:underline hover:underline-offset-1 duration-200">
        M
      </span>
      <span className="my-8 text-4xl">U</span>
      <span className="my-8 text-4xl hover:font-bold hover:underline hover:underline-offset-1 duration-200">
        ZZPLAYER
      </span>
    </p>
  );
}

export function TypographyTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn([
        className,
        "my-8 text-6xl font-sans text-center justify-center",
      ])}
    >
      {children}
    </p>
  );
}

export function TypographyMedium({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn([
        className,
        "my-8 text-lg font-sans text-center justify-center",
      ])}
    >
      {children}
    </p>
  );
}

export function TypographySmall({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn([
        className,
        "my-8 text-md font-bold text-center justify-center",
      ])}
    >
      {children}
    </p>
  );
}
