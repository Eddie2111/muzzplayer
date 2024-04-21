import { Image } from '@nextui-org/react';

import { UseMusicContext } from '../../components/contexts/Music-Context';
import { ISongsProps } from '../../types/types.d';

interface MusicItemsProps extends ISongsProps {
  onClick: () => void;
}

export default function MusicItems({
  title,
  artist,
  song,
  id,
  onClick,
}: MusicItemsProps): JSX.Element {
  const { setMusic, setArtist, setTitle } = UseMusicContext();
  const selectedMusic = async (song: string) => {
    console.log(song, "the songtrack");
    setMusic(id || "");
    setTitle(title || "");
    setArtist(artist || "");
    onClick(); // Call the provided onClick handler
  };

  return (
    <div
      className="flex flex-row justify-left px-5 py-2 my-2 bottom-2 bg-blue-200"
      onClick={() => selectedMusic(song)}
    >
      <Image
        src="https://w7.pngwing.com/pngs/274/853/png-transparent-musical-note-icon-music-notes-miscellaneous-logo-monochrome-thumbnail.png"
        alt="Song Image"
        className="w-16 h-16 rounded-full"
      />
      <div className="flex flex-col">
        <h1 className="text-xl text-left mx-5">{title}</h1>
        <p className="text-md text-left mx-5">{artist}</p>
      </div>
    </div>
  );
}
