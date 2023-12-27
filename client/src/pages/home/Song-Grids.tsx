import {Spinner} from '@nextui-org/react';

import Genres from './genres';
import Singers from './singers';
import MusicLists from './music-list';

import { ISongsProps } from '../../types/types.d';

export default function SongGrids({datalist, genres, singers}:{datalist:ISongsProps[], genres:string[], singers:string[]}):JSX.Element{
    if (!datalist) {
        return (
          <div className="flex flex-row justify-center items-center h-screen">
            <Spinner color="primary" />
          </div>
        );
    }
    return(
        <div className="container mx-auto my-10 pb-32">
            <center>
            <div className='flex flex-col md:flex-row gap-4'>
                <MusicLists songLists={datalist}/>
                <div className="flex flex-col gap-4">
                    <Genres genrelist={genres}/>
                    <Singers singerlist={singers}/>
                </div>
            </div>
            </center>
        </div>
    )
}



