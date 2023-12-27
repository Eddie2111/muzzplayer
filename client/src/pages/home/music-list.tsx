import React from 'react';
import { Card, CardBody, CardFooter, Input, Pagination } from '@nextui-org/react';
import { UseSearchContext } from '../../components/contexts/Search-Context';
import MusicItems from '../../components/ListItems/Music-Items';
import { ISongsProps } from '../../types/types.d';
import { z } from 'zod';

export interface MusicListsProps {
  songLists: ISongsProps[];
}

export default function MusicLists({ songLists }: MusicListsProps): JSX.Element {
  const { genre, artist } = UseSearchContext();
  const [search, setSearch] = React.useState<string>(' ');
  const [current, setCurrent] = React.useState<number>(1);

  React.useEffect(() => {
    if (genre === '' && artist === '') {
      setSearch('');
    }
    if (genre === '' && artist !== '') {
      setSearch(artist);
    }
    if (genre !== '' && artist === '') {
      setSearch(genre);
    }
  }, [genre, artist]);

  const SongTrack = (song: string) => {
    console.log(song, 'the songtrack');
  };

  const increment = (page: number) => {
    setCurrent(page);
  };

  return (
    <>
      <Card className="flex flex-col w-full md:w-2/5">
        <h4 className="text-md text-center font-bold mt-5">Find your loved records from here</h4>
        <Input
          placeholder="Search For a song"
          className="w-[95%] mx-4 h-16"
          onChange={(e) => {
            z.string().parse(e.target.value);
            setSearch(e.target.value);
          }}
        />
        <CardBody className="py-10">
          <div className="overflow-y-auto h-[52vh] mx-8 bg-slate-200 p-2 rounded-lg shadow-inner shadow-slate-400">
            {songLists.slice(current, current * 12).map((e: ISongsProps, i: number) => {
              if (
                e?.title?.toLowerCase().includes(search.toLowerCase()) ||
                e?.artist?.toLowerCase().includes(search.toLowerCase()) ||
                e?.genre?.toLowerCase().includes(search.toLowerCase())
              ) {
                return (
                  <MusicItems
                    key={i}
                    title={e.title}
                    artist={e.artist}
                    albumImage={e.song}
                    song={e.song}
                    onClick={() => SongTrack(e.song)}
                    id={e.id}
                  />
                );
              }
              return null;
            })}
          </div>
        </CardBody>
        <CardFooter className="flex flex-col mx-auto my-5 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] items-center justify-center">
          <Pagination loop showControls color="success" total={Math.ceil(songLists.length / 12)} initialPage={1} onChange={increment} />
        </CardFooter>
      </Card>
    </>
  );
}
