import axios from 'axios'
import React from 'react'
import {Button, Input} from '@nextui-org/react'
import apikey from '../pages/api/apikey'
export default function Test() {
    const [file, setFile] = React.useState<File | null>(null)
    const [title, setTitle] = React.useState('')
    const [artist, setArtist] = React.useState('')
    const [genre, setGenre] = React.useState('')
    const [albumPicture, setAlbumPicture] = React.useState<File | null>(null)
    return (
        <div>
        <h1>Test</h1>
        <form className='border-2 border-slate-400 rounded-lg p-4 flex flex-col'
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = new FormData()
            formData.append('filetoupload', file!)
            formData.append('title', title)
            formData.append('artist', artist)
            formData.append('genre', genre)
            formData.append('albumPicture', albumPicture!)
            const res = await axios.post(`${apikey}/songs`, formData)
            console.log(res)
        }}>
            <Input type="file" onChange={(e) => {
                setFile(e.target.files![0])
            }}/>
            <Input label='Song Name' type="text" value={title} onChange={(e) => {
                setTitle(e.target.value)
            }}/>
            <Input label='Artist' type="text" value={artist} onChange={(e) => {
                setArtist(e.target.value)
            }}/>
            <Input label='Genre' type="text" value={genre} onChange={(e) => {
                setGenre(e.target.value)
            }}/>
            <Input type="file" onChange={(e) => {
                setAlbumPicture(e.target.files![0])
            }}/>
            <Button color='primary' type="submit">Submit</Button>
        </form>
        </div>
    )
}