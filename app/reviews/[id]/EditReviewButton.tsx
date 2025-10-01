"use client"

import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation"

export default function EditReviewButton({reviewId}: { reviewId: string }) {

    return (
        <Button variant="secondary" onClick={() => {
            redirect(`/reviews/${reviewId}/edit`)
        }}>
            Edit
        </Button>
    );
}
