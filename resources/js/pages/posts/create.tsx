import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react';
import { Interface } from 'readline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create',
        href: '/posts/create',
    },
];

type FormData = {
    title: string,
    content: string,
    image: File | null
}

const PostCreate = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: '',
        content: '',
        image: null
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(file) setData('image', file)

        setImagePreview(URL.createObjectURL(file))
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        console.log(data)

        post(route('posts.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <form onSubmit={submit} className='flex flex-col w-1/2 m-auto'>
                    <input type="text" name='title' value={data.title} onChange={e => setData('title', e.target.value)} placeholder='Title' className='w-full bg-neutral-900 py-3 px-3 rounded-lg' />
                    {errors.title && <div>{errors.title}</div>}
                    
                    <textarea name='content' value={data.content} onChange={e => setData('content', e.target.value)} placeholder='Content...' className='w-full bg-neutral-900 py-3 px-3 rounded-lg mt-3 resize-y min-h-30'></textarea>
                    {errors.content && <div>{errors.content}</div>}
                    
                    <input type="file" id='image' name='image' onChange={handleFileChange} className='w-full bg-neutral-900 py-3 px-3 rounded-lg mt-3' />
                    {imagePreview && <img className='mt-3' src={imagePreview} />}
                    {errors.image && <div>{errors.image}</div>}

                    <button className='bg-blue-900 p-2 px-10 rounded-xl self-end mt-3 hover:bg-blue-950 cursor-pointer transition' type='submit'>Submit</button>
                </form>

            </div>
        </AppLayout>
    )
}

export default PostCreate