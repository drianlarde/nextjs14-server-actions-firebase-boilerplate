import Container from '@/components/layout/container';
import { getPosts } from '@/lib/actions/post';

import CreatePost from './components/create-post';
import DeletePost from './components/delete-post';
import UpdatePost from './components/update-post';

export default async function Home() {
    const posts = await getPosts();

    return (
        <>
            <Container className="py-20">
                <h1 className="text-lg">
                    Create Post! GDSC Web Boilerplate (NextJS 14 Server Actions
                    + Firebase Firestore)
                </h1>
                <p className="mb-10 text-zinc-400">
                    This is a simple example of creating a post using Firebase
                    Firestore.
                </p>
                <CreatePost />

                <h1 className="text-lg mt-10">
                    {
                        // If no posts, show no posts message
                        posts.length === 0 ? 'No posts found' : 'Posts'
                    }
                </h1>
                <ul className="space-y-4 mt-4">
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            className="p-4 outline outline-1 outline-zinc-200 rounded-xl flex justify-between gap-10 items-start"
                        >
                            <div>
                                <h2>{post.title}</h2>
                                <p className="text-sm text-zinc-500 mb-2">
                                    ID: {post.id}
                                </p>
                                <p className="text-sm">{post.content}</p>
                            </div>
                            <div className="space-y-2">
                                <UpdatePost post={post} />
                                <DeletePost id={post.id} />
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </>
    );
}
