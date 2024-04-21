import React from 'react';

import { Card } from '@nextui-org/react';

import apikey from '../../pages/api/apikey';
import { UseMusicContext } from '../contexts/Music-Context';

export default function MusicPlayer(): JSX.Element {
  const [songData, setSongData] = React.useState<string | null>(null);
  const { music, artist, title } = UseMusicContext();
  const { setMusic, setArtist, setTitle } = UseMusicContext();
  const clearSong = () => {
    console.log("clearing song");
    setMusic("");
    setArtist("");
    setTitle("");
    setSongData(null);
  };

  React.useEffect(() => {
    async function getSong() {
      if (music) {
        try {
          // Assuming the response.data is the song URL
          setSongData(`${apikey}/getSongs?id=${music}`);
        } catch (error) {
          console.error("Error fetching song:", error);
        }
      }
    }

    getSong();
  }, [music]);

  console.log(songData, "the song data");
  if (!music) {
    return <></>;
  }
  return (
    <Card className="mx-5 w-[98%] h-[6rem] fixed bottom-3 z-[1000]" isBlurred>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="mx-2 mr-32">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-md">{artist}</p>
          </div>
        </div>
        <div className="flex flex-col w-[80%]">
          <button
            onClick={clearSong}
            className="w-8 h-8 pb-1 bg-red-500 hover:bg-red-600 text-white text-xl right-20 rounded-lg absolute"
          >
            x
          </button>
          {songData && (
            <audio controls className="w-[90%] mx-4 h-16 rounded-lg mb-10">
              <source src={songData} type="audio/mpeg" />
            </audio>
          )}
        </div>
      </div>
    </Card>
  );
}
