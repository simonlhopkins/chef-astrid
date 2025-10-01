import {createClient} from "@/lib/supabase/server";
import {notFound} from "next/navigation";
import EditReviewForm from "@/app/reviews/[id]/edit/EditReviewForm";


export default async function EditPage(props: PageProps<'/reviews/[id]/edit'>) {
    const {id} = await props.params
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) throw new Error("Not logged in")

    const {data: review, error} = await supabase
        .from("reviews")
        .select(`
    *,
    review_tags(tag)
  `)
        .eq("user_id", user.id)
        .eq("id", id)   // filter by review id
        .single()             // ensures you only get one row

    if (error) throw error
    if (review == null) {
        notFound();
    }

    const {data: tagsData, error: tagsError} = await supabase
        .from("review_tags")
        .select("tag", {count: "exact"})
        .order("tag", {ascending: true})

    if (tagsError) throw tagsError

    // Extract unique tags (Supabase might return duplicates if multiple reviews use the same tag)
    const uniqueTags = Array.from(new Set(tagsData?.map((t) => t.tag)))

    return (
        <EditReviewForm reviewRow={({
            ...review,
            tags: review.review_tags.map(t => t.tag)
        })} existingTags={uniqueTags}/>
    )
}