import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show',
        href: '/posts/show',
    },
];

type Post = {
    id: number,
    title: string,
    content: string,
    image: string
}

const PostEdit = ({ post }: { post: Post }) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show" />

            <div className="flex justify-center flex-col items-center">
                <h1 className='text-4xl p-5'>{post.title}</h1>

                <span className='p-5 text-xl'>{post.content}</span>

                <img src={'/storage/' + post.image} alt="" className='w-1/2 p-5' />
            </div>
        </AppLayout>
    )
}

export default PostEdit