import { motion } from "motion/react";
import { Spinner } from "./Spinner";

export const GameLoader = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute -right-[535px] -bottom-[840px]"
        initial={{ rotate: 45 }}
        animate={{ rotate: -315 }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <Spinner
          text="LOADING  LOADING  LOADING  LOADING  LOADING"
          radius={800}
          fontSize="180px"
          letterSpacing={8}
        />
      </motion.div>
      <motion.div
        className="absolute -right-[385px] -bottom-[695px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <Spinner
          text="LOADING  LOADING  LOADING  LOADING"
          radius={650}
          fontSize="180px"
          letterSpacing={10}
        />
      </motion.div>
      <motion.div
        className="absolute -right-[200px] -bottom-[510px]"
        initial={{ rotate: -5 }}
        animate={{ rotate: -365 }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <Spinner
          text="LOADING LOADING LOADING"
          radius={480}
          fontSize="180px"
          letterSpacing={15}
        />
      </motion.div>
    </motion.div>
  );
};
