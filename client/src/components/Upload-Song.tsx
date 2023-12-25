import axios from 'axios'
import React from 'react'
import {Button, Input} from '@nextui-org/react'
export default function Test() {
    const [file, setFile] = React.useState<File | null>(null)
    const [title, setTitle] = React.useState('')
    const [artist, setArtist] = React.useState('')
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
            const res = await axios.post('http://localhost:3200/songs', formData)
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
            <Button color='primary' type="submit">Submit</Button>
        </form>
        </div>
    )
}