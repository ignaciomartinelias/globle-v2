import { motion } from "motion/react";

type Props = {
  text: string;
  radius: number;
  fontSize: string;
  letterSpacing: number;
};

export const Spinner = ({ text, radius, fontSize, letterSpacing }: Props) => {
  const characters = text.split("");

  return (
    <motion.div
      className="relative aspect-square"
      style={{ width: radius * 2 }}
    >
      <p aria-label={text} />
      <p aria-hidden="true">
        {characters.map((ch, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-0 font-[Creepster] bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent"
            style={{
              transformOrigin: `0 ${radius}px`,
              transform: `rotate(${i * letterSpacing}deg)`,
              fontSize,
            }}
          >
            {ch}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
};
