import Banner from './banner';
import MusicPlayer from '../../components/Music-Player';
import SongGrid from './Song-Grids';
export default function Home(){
    return(
        <>
        <div className='w-full md:h-[28rem] h-[26rem] bg-gradient-to-r from-green-200 to-blue-600 flex flex-col md:flex-row justify-between items-center px-[26rem]'>
            <Banner />
            <div className='w-[16rem] h-[12rem] md:w-[38rem] md:h-[24rem] flex flex-col justify-center items-center bg-slate-900 bg-opacity-50 rounded-xl'>
                <h1 className='text-4xl font-bold text-white space-y-4'>Welcome to the</h1>
                <span className='text-6xl my-16 font-bold'> MuzzPlayer </span>
                <p className='text-2xl text-white'>We have the best music around the world</p>
            </div>
        </div>
        <SongGrid />
        <MusicPlayer/>
        </>
    )
}