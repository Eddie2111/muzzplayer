import React, { createContext, useContext, ReactNode, useState } from 'react';

interface MusicContextProps {
  music: string;
  setMusic: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  artist: string;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
}

const MusicContext = createContext<MusicContextProps | undefined>(undefined);

const UseMusicContext = (): MusicContextProps => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

const MusicProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [music, setMusic] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');

  return (
    <MusicContext.Provider value={{ music, setMusic, title, setTitle, artist, setArtist }}>
      {children}
    </MusicContext.Provider>
  );
};

export { UseMusicContext, MusicProvider };
