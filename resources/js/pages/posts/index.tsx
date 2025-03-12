import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react'
import { Interface } from 'readline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

interface Post {
  id: number,
  title: string,
  content: string,
  image: string
}

const PostIndex = ({ posts } : { posts: Post[] }) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Posts" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Link
          className='text-white w-full bg-neutral-900 rounded-lg py-5 hover:bg-neutral-800 cursor-pointer transition text-center' 
          href={route('posts.create')}>
            Add New
        </Link>

        {posts.map((post) => {
          return(
            <div key={post.id} className='text-white flex justify-between gap-5 px-2 items-center w-full bg-gray-900 rounded-lg py-2 hover:bg-gray-800 cursor-pointer transition'>
              <img src={'/storage/' + post.image} alt="" className='w-15 h-15 rounded-lg' />
              <Link href={route('posts.show', post.id)} className='text-xl'>{post.title}</Link>
              <div className='flex gap-5 mx-5'>
                <Link href={route('posts.edit', post.id)} className='text-blue-500'>Edit</Link>
                <Link href={route('posts.destroy', post.id)} method='delete' as='button' className='cursor-pointer text-red-700'>Delete</Link>
              </div>
            </div>
          )
        })}
      </div>
    </AppLayout>
  )
}

export default PostIndex