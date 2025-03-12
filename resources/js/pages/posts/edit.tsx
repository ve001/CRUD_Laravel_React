import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit',
        href: '/posts/edit',
    },
];

type Post = {
    id: number,
    title: string,
    content: string,
    image: string
}

const PostEdit = ({ currentPost }: {currentPost: Post}) => {

    const [title, setTitle] = useState(currentPost.title)
    const [content, setContent] = useState(currentPost.content)
    const [image, setImage] = useState<File | null>()
    const [oldImage, setOldImage] = useState<string | null>(currentPost.image)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const { errors } = usePage().props

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        router.post(route('posts.update', currentPost.id), {
            _method: 'put',
            title,
            content,
            image
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <form onSubmit={submit} className='flex flex-col w-1/2 m-auto'>
                    <input type="text" name='title' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' className='w-full bg-neutral-900 py-3 px-3 rounded-lg' />
                    {errors.title && <div>{errors.title}</div>}
                    
                    <textarea name='content' value={content} onChange={e => setContent(e.target.value)} placeholder='Content...' className='w-full bg-neutral-900 py-3 px-3 rounded-lg mt-3 resize-y min-h-30'></textarea>
                    {errors.content && <div>{errors.content}</div>}
                    
                    <input type="file" id='image' name='image' onChange={handleFileChange} className='w-full bg-neutral-900 py-3 px-3 rounded-lg mt-3' />
                    <div className="flex mt-3">
                        {oldImage && <img src={'/storage/' + oldImage} className={'w-1/2 ' + (imagePreview && 'opacity-10')} />}
                        {imagePreview && <img src={imagePreview} className='w-1/2' />} 
                    </div>
                    
                    {errors.image && <div>{errors.image}</div>}

                    <button className='bg-blue-900 p-2 px-10 rounded-xl self-end mt-3 hover:bg-blue-950 cursor-pointer transition' type='submit'>Update</button>
                </form>

            </div>
        </AppLayout>
    )
}

export default PostEdit