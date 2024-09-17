import { ChangeEvent, useMemo, useState } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Fuse from "fuse.js";
import styles from "../styles";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  data: string[];
  onSearchResults: (results: string[]) => void;
}

const SearchBar = ({ data, onSearchResults }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      threshold: 0.3,
    };
    return new Fuse(data, options);
  }, [data]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      onSearchResults(data);
    } else {
      const result = fuse.search(query);
      onSearchResults(result.map(({ item }) => item));
    }
  };

  return (
    <InputGroup>
      <InputLeftElement fontSize="xl" pt={10} pb={10}>
        <SearchIcon color={styles.colors.text.primary} />
      </InputLeftElement>
      <Input
        pt={10}
        pb={10}
        background={styles.colors.primary}
        placeholder="Search"
        borderWidth={1}
        borderRadius={0}
        borderColor={styles.colors.border}
        onChange={handleSearchChange}
        value={searchQuery}
        fontSize="xl"
        borderTop={0}
        _hover={{
          borderColor: styles.colors.border,
        }}
        _active={{
          borderColor: styles.colors.accent,
        }}
      />
    </InputGroup>
  );
};

export default SearchBar;
