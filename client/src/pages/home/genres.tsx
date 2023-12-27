import {Button, Card, CardBody} from '@nextui-org/react';

import {UseSearchContext} from '../../components/contexts/Search-Context';

export default function Genres({genrelist}: {genrelist:string[]}):JSX.Element{
    const {setGenre} = UseSearchContext();
    // const [query, setQuery] = React.useState<string>('');
    const SelectGenre = (genre:string) => {
        setGenre(genre);
    }
    return(
        <Card className='shadow-none md:shadow-none'>
            <p className="text-lg text-left px-5 py-2">Find your preferred genres from here</p>
            <CardBody>
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        genrelist.map((genre, index) => (
                            <Button key={index} className="bg-white border-1 border-slate-400 h-16  w-[220px] hover:shadow-lg hover:shadow-orange-300 duration-300" onClick={() => SelectGenre(genre)}>
                                {genre}
                            </Button>
                        ))
                    }
                </div>
            </CardBody>
        </Card>
    )
}