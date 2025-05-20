import { CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { FC, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  onSelectCountry: (country: string) => void;
  countryList: string[];
  disabled?: boolean;
};

export const CountryCombobox: FC<Props> = ({
  onSelectCountry,
  countryList,
  disabled,
}) => {
  const [search, setSearch] = useState("");

  const handleGuess = (countryName: string) => {
    if (!search) {
      return;
    }

    onSelectCountry(countryName);
    setSearch("");
  };

  return (
    <Command
      className="rounded-md border border-gray-200 mb-4 relative h-fit overflow-visible"
      loop
    >
      <CommandInput
        placeholder="Search country..."
        value={search}
        onValueChange={setSearch}
        autoFocus
        disabled={disabled}
      />

      <CommandList
        className={cn(
          "w-full absolute -bottom-2 translate-y-full bg-white z-10 border border-gray-200 rounded drop-shadow-xl",
          { hidden: search === "" }
        )}
      >
        <CommandEmpty>No country found.</CommandEmpty>
        <CommandGroup>
          {countryList.map((country) => (
            <CommandItem
              key={country}
              onSelect={() => handleGuess(country)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <CheckIcon className="mr-2 h-4 w-4 opacity-0" />
              {country}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
