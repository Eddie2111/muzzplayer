import {Card, CardBody, Image} from '@nextui-org/react';

export default function SongGrids():JSX.Element{
    const cardNumbers = 35;
    return(
        <div className="container mx-auto my-10">
        <div className="grid grid-cols-4 gap-4">
            {
                Array(cardNumbers).fill(0).map((_,index)=>(
                    <MusicCards key={index}/>
                ))
            }
        </div>
        </div>
    )
}

function MusicCards():JSX.Element{
    return(
        <Card>
            <CardBody>
                <div className="flex flex-row justify-between items-center">
                    <Image src="https://picsum.photos/200/300" alt="Song Image" className="w-16 h-16 rounded-full" />
                    <h1 className="text-2xl font-bold text-left">Song Name</h1>
                    <p className="text-xl text-left">Artist Name</p>
                </div>
            </CardBody>
        </Card>
    )
}