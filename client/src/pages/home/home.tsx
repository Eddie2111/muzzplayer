import React from 'react';
import axios from 'axios';
import Banner from './banner';
import MusicPlayer from '../../components/Music-Player';
import SongGrid from './Song-Grids';
import { MusicProvider } from '../../components/contexts/Music-Context';
import { SearchProvider } from '../../components/contexts/Search-Context';
// import { ResponseProps } from '../../types/types.d';
import apikey from '../api/apikey';

export default function Home() {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    axios.get(`${apikey}/getallsongs`).then((res) => {
        setData(res?.data?.data || null);
      }).catch((err) => {
        console.log(err);
      });
    }, []);

  console.log(apikey);

  return (
    <>
      <MusicProvider>
        <SearchProvider>
          <div className='w-full md:h-[28rem] h-[26rem] bg-gradient-to-r from-green-200 to-blue-600 flex flex-col md:flex-row justify-between items-center px-[26rem]'>
            <Banner />
            <div className='w-[16rem] h-[12rem] md:w-[38rem] md:h-[24rem] flex flex-col justify-center items-center bg-slate-900 bg-opacity-50 rounded-xl'>
              <h1 className='text-4xl font-bold text-white space-y-4'>Welcome to the</h1>
              <span className='text-6xl my-16 font-bold'> MuzzPlayer </span>
              <p className='text-2xl text-white'>We have the best music around the world</p>
            </div>
          </div>
          <SongGrid datalist={data?.songs || []} genres={data?.genres || []} singers={data?.singers || []} />
          <MusicPlayer />
        </SearchProvider>
      </MusicProvider>
    </>
  );
}
