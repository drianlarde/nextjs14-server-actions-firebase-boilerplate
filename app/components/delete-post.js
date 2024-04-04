'use client';

import { Button } from '@/components/ui/button';
import { deletePost } from '@/lib/actions/post';

export default function DeletePost({ id }) {
    const onDelete = async () => {
        await deletePost(id);
    };

    return (
        <Button onClick={onDelete} className="text-white" variant="destructive">
            Delete
        </Button>
    );
}
