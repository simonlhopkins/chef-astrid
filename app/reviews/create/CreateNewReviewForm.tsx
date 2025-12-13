"use client"

import ReviewForm, {ReviewFormSchemaType} from "@/components/ReviewForm/ReviewForm";
import {createClient} from "@/lib/supabase/client";
import {redirect} from "next/navigation";


interface Props {
    existingTags: string[];
}

export default function CreateNewReviewForm({existingTags}: Props) {


    return (
        <ReviewForm tags={existingTags} onFormSubmit={insertValuesToSupabase}/>
    )
}

async function insertValuesToSupabase(formResponse: ReviewFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const supabase = createClient()

    // 1️⃣ Insert the review
    const {data: reviewData, error: reviewError} = await supabase
        .from("reviews")
        .insert([
            {
                name: formResponse.restaurantName,
                date_visited: formResponse.date_visited.toLocaleDateString(),
                rating: formResponse.rating,
                review_text: formResponse.review,
                google_place_id: formResponse.placeId || "N/A"
            }
        ])
        .select() // return the inserted row(s)

    if (reviewError) {
        console.error("Insert review error:", reviewError.message)
        throw reviewError
    }

    // Supabase returns an array of inserted rows
    const reviewId = reviewData[0].id

    // 2️⃣ Insert the tags
    if (formResponse.tags.length > 0) {
        const {error: tagsError} = await supabase
            .from("review_tags")
            .insert(
                formResponse.tags.map((tag) => ({
                    review_id: reviewId,
                    tag,
                }))
            )
        if (tagsError) {
            console.error("Insert tags error:", tagsError.message)
            throw tagsError
        }
    }

    redirect("/reviews")
}
