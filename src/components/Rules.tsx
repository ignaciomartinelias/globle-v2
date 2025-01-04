import {
  GlobeIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  TargetIcon,
} from "@radix-ui/react-icons";

export const Rules = () => {
  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-600">
        Game Rules
      </h2>
      <ul className="space-y-4">
        <li className="flex items-start">
          <MagnifyingGlassIcon className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" />
          <span>
            Embark on a global adventure! Guess the hidden country by searching
            and selecting from the list.
          </span>
        </li>
        <li className="flex items-start">
          <TargetIcon className="w-6 h-6 mr-2 text-green-500 flex-shrink-0" />
          <span>
            Each guess reveals the distance from your choice to the target
            country. Use this intel wisely!
          </span>
        </li>
        <li className="flex items-start">
          <GlobeIcon className="w-6 h-6 mr-2 text-purple-500 flex-shrink-0" />
          <span>
            Challenge yourself to guess the country in as few attempts as
            possible. Can you conquer the world?
          </span>
        </li>
        <li className="flex items-start">
          <LightningBoltIcon className="w-6 h-6 mr-2 text-orange-500 flex-shrink-0" />
          <span>
            Analyze the map and your previous guesses to strategize your next
            move. Think like a geographer!
          </span>
        </li>
      </ul>
    </div>
  );
};
