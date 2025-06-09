import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="80"
      height="30"
      viewBox="0 0 80 30"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Orbitron, sans-serif"
        fontSize="24"
        fontWeight="bold"
      >
        VSD
      </text>
    </svg>
  );
}
