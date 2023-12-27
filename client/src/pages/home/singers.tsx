import {Button, Card, CardBody} from '@nextui-org/react';
import React from 'react';

import {UseSearchContext} from '../../components/contexts/Search-Context';

export default function Singers({ singerlist }: { singerlist: string[] }): JSX.Element {
    const { setArtist } = UseSearchContext();
    const [selectedSingers, setSelectedSingers] = React.useState<string[]>([]);
    React.useEffect(() => {
      // Shuffling the singerlist array
      const shuffledSingerlist = [...singerlist].sort(() => Math.random() - 0.5);
      const selectedSingers = shuffledSingerlist.slice(0, 8);
      setSelectedSingers(selectedSingers);
    }, [singerlist]);
    return (
      <Card className='shadow-none md:shadow-none'>
        <p className="text-lg text-left px-5 py-2">Find your preferred singers from here</p>
        <CardBody>
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedSingers.map((singer, index) => (
              <Button key={index} className="bg-white border-1 border-slate-400 h-16  w-[220px] hover:shadow-lg hover:shadow-orange-300 duration-300"
              onClick = {() => setArtist(singer)}
              >
                {singer}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }