import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface SearchContextProps {
  genre: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  artist: string;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

const UseSearchContext = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

const SearchProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [genre, setGenre] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{ genre, setGenre, artist, setArtist, title, setTitle }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, UseSearchContext };
