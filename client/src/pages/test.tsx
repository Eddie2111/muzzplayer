import axios from 'axios';
import React from 'react';
import UploadSong from '../components/Upload-Song';
// import MusicPlayer from '../components/Music-Player/index';
export default function Test(): JSX.Element {
    // getting a song on initial load
    const [song, setSong] = React.useState<File | null>(null);
    React.useEffect(() => {
        const GetSong = async()=>{
            const response = await axios.get('http://localhost:3200/getsongs?filename=1b159165adcdefd32c6d3b600.mp3')
            setSong(response.data)
        }
        GetSong()
    }, [])
    return(
        <div>
            
            {
                song && 
<audio controls className='w-3/4 bg-gray-800 rounded-md p-4 my-8 mx-2 px-4'>
  <source src={`http://localhost:3200/getsongs?filename=1b159165adcdefd32c6d3b600.mp3`} type="audio/mpeg" className='w-full bg-gray-800 rounded-md p-4 my-8 mx-2 px-4'/>
</audio>

            }
            <UploadSong />
        </div>
    )
}