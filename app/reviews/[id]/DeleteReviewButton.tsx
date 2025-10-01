"use client"

import {Button} from "@/components/ui/button";
import {toast} from "sonner"
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation"

export default function DeleteReviewButton({reviewId}: { reviewId: string }) {
    const router = useRouter()
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        const supabase = createClient();
        const {error} = await supabase
            .from('reviews')
            .delete()
            .eq('id', reviewId);

        if (error) {
            toast("Error");
        } else {
            router.push("/reviews")
            toast("Review deleted successfully.");
        }
    };

    return (
        <Button variant="destructive" className={"cursor-pointer"} onClick={handleDelete}>
            Delete
        </Button>
    );
}
