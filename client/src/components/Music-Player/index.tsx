import React from 'react';
import { Card, Image } from '@nextui-org/react';

interface MusicPlayerProps {
  song: string;
}

export default function MusicPlayer({ song }: MusicPlayerProps): JSX.Element {
  const [current, setCurrent] = React.useState<string>(song);

  const clearSong = () => {
    setCurrent('');
  };
  console.log(current)
  React.useEffect(() => {
    setCurrent(song);
  }, [song]);

  if (!song) return <> </>;

  return (
    <Card className="mx-5 w-[98%] h-[6rem] fixed bottom-3 z-[1000]" isBlurred>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Image src="https://mehtabdarblog.files.wordpress.com/2012/11/chris-brown-cover.jpg" width="120px" height="250px" />
          <div className="mx-2 mr-32">
            <h1 className="text-lg font-bold">Song Name</h1>
            <p className="text-md">Song Artist</p>
          </div>
        </div>
        <div className="flex flex-col w-[80%]">
          <button onClick={clearSong} className="w-8 h-8 pb-1 bg-red-500 hover:bg-red-600 text-white text-xl right-20 rounded-lg absolute">
            x
          </button>
          <audio controls className="w-[90%] mx-4 h-16 rounded-lg mb-10">
            <source src={song} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </Card>
  );
}
