import {
  GlobeIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  TargetIcon,
} from "@radix-ui/react-icons";
import { motion } from "motion/react";

const rules = [
  {
    Icon: MagnifyingGlassIcon,
    text: "Embark on a global adventure! Guess the hidden country by searching and selecting from the list.",
  },
  {
    Icon: TargetIcon,
    text: "Each guess reveals the distance from your choice to the target country. Use this intel wisely!",
  },
  {
    Icon: GlobeIcon,
    text: "Challenge yourself to guess the country in as few attempts as possible. Can you conquer the world?",
  },
  {
    Icon: LightningBoltIcon,
    text: "Analyze the map and your previous guesses to strategize your next move. Think like a geographer!",
  },
];

export const Rules = () => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-lg border border-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center">
        <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
          Game Rules
        </span>
        <div className="ml-3 h-px flex-grow bg-gradient-to-r from-blue-200 to-transparent"></div>
      </h2>

      <ul className="flex flex-col gap-4">
        {rules.map(({ Icon, text }, index) => (
          <motion.li
            key={index}
            className="flex items-center group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, ease: "easeInOut" }}
          >
            <div className="mr-4 p-2 rounded-lg transition-colors duration-300 bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
              <Icon className="size-6 " />
            </div>
            <div className="pt-1">
              <p className="transition-colors duration-300 text-gray-700 group-hover:text-blue-900">
                {text}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
