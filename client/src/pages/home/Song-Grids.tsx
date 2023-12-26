import {Card, CardBody, Image, Input} from '@nextui-org/react';
import React from 'react';
export default function SongGrids():JSX.Element{
    // const cardNumbers = 35;
    return(
        <div className="container mx-auto my-10 pb-32">
            <div className='flex flex-col md:flex-row gap-4'>
                <MusicLists/>
                <div className="flex flex-col gap-4">
                    <Genres/>
                    <Singers/>
                </div>
            </div>
        </div>
    )
}

function Genres():JSX.Element{
    const genres = 5;
    return(
        <Card className='shadow-none md:shadow-none'>
            <p className="text-lg text-left px-5 py-2">Find your preferred genres from here</p>
            <CardBody>
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        [...Array(genres)].map((e, i) => <MusicCards key={i} props={e}/>)
                    }
                </div>
            </CardBody>
        </Card>
    )
}
function Singers():JSX.Element{
    const genres = 5;
    return(
        <Card className='shadow-none md:shadow-none'>
            <p className="text-lg text-left px-5 py-2">Find your preferred singers from here</p>
            <CardBody>
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        [...Array(genres)].map((e, i) => <MusicCards key={i} props={e}/>)
                    }
                </div>
            </CardBody>
        </Card>
    )
}
function MusicLists():JSX.Element{
    const [search, setSearch] = React.useState<string>('');
    const items = 20;
    console.log(search)
    return(
        <Card className="flex flex-col w-full md:w-2/5">
            <h4 className="text-md text-center font-bold mt-5">Find your loved records from here</h4>
            <Input placeholder="Search For a song" className="w-[95%] mx-4 h-16" onChange={(e) => setSearch(e.target.value)} />
            <CardBody className='py-10'>
                <div className='overflow-y-auto h-[52vh] mx-8 bg-slate-300 p-2 rounded-lg'>
                    {
                        [...Array(items)].map((e, i) => <MusicItems key={i} props={e}/>)
                    }
                </div>
            </CardBody>
        </Card>
    )
}
function MusicItems({props}:number):JSX.Element{
    console.log(props)
    return(
        <div className="flex flex-row justify-between items-center px-5 my-2 bottom-2 border-red-500">
            <Image src="https://picsum.photos/200/300" alt="Song Image" className="w-16 h-16 rounded-full" />
            <h1 className="text-2xl font-bold text-left">Song Name</h1>
            <p className="text-xl text-left">Artist Name</p>
        </div>
    )
}

function MusicCards({props}:number):JSX.Element{
    console.log(props)
    return(
        <Card className='border-1 border-slate-400 w-[220px] hover:shadow-lg hover:shadow-orange-300 duration-300'>
            <CardBody>
                <div className="flex flex-row justify-between items-center gap-5">
                    <Image src="https://picsum.photos/200/300" alt="Song Image" className="w-16 h-16 rounded-full" />
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className="text-lg text-left">Song Name</h1>
                        <p className="text-md text-left">Artist Name</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}