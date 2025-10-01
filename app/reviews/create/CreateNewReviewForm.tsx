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

async function insertValuesToSupabase(formResult: ReviewFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const supabase = createClient()

    // 1️⃣ Insert the review
    const {data: reviewData, error: reviewError} = await supabase
        .from("reviews")
        .insert([
            {
                name: formResult.restaurantName,
                date_visited: formResult.date_visited.toLocaleDateString(),
                rating: formResult.rating,
                review_text: formResult.review,
                google_place_id: "none"
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
    if (formResult.tags.length > 0) {
        const {error: tagsError} = await supabase
            .from("review_tags")
            .insert(
                formResult.tags.map((tag) => ({
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
