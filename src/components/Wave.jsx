// Swirly divider painted in the previous section's colour, like the poster's orange bands.
export default function Wave({ color }) {
  return (
    <svg
      className="wave"
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M0 0H1440V28C1200 76 1010 -4 720 30C440 62 230 4 0 36Z"
      />
    </svg>
  );
}
