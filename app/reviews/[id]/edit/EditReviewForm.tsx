"use client"

import ReviewForm, {ReviewFormSchemaType} from "@/components/ReviewForm/ReviewForm";
import {createClient} from "@/lib/supabase/client";
import {Database} from "@/database.types";
import {redirect} from "next/navigation";

type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"]

interface Props {
    reviewRow: ReviewRow & { tags: string[] }
    existingTags: string[]
}

export default function EditReviewForm({existingTags, reviewRow}: Props) {

    return (
        
        <ReviewForm
            tags={existingTags}
            onFormSubmit={async (data) => {
                await updateReview(reviewRow.id, data);
                redirect("/reviews")
            }}
            defaultValues={reviewRow}
        />

    )
}


export async function updateReview(
    reviewId: string,
    formResponse: ReviewFormSchemaType
) {
    const supabase = createClient()

    const {data, error} = await supabase
        .from("reviews")
        .update({
            name: formResponse.restaurantName,
            date_visited: formResponse.date_visited.toLocaleDateString(),
            rating: formResponse.rating,
            review_text: formResponse.review,
            google_place_id: "none"
        })       // 👈 only updates provided fields
        .eq("id", reviewId)    // 👈 where id = reviewId
        .select()              // 👈 return updated row(s)

    if (error) {
        console.error("Update review error:", error.message)
        throw error
    }

    await supabase.from("review_tags").delete().eq("review_id", reviewId)
    await supabase.from("review_tags").insert(formResponse.tags.map(tag => ({review_id: reviewId, tag})))

    return data[0]
}