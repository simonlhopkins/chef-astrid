import {createClient} from "@/lib/supabase/server";
import CreateNewReviewForm from "@/app/reviews/create/CreateNewReviewForm";

export default async function CreatePage() {

    const supabase = await createClient()

    // Fetch all distinct tags
    const {data: tagsData, error: tagsError} = await supabase
        .from("review_tags")
        .select("tag", {count: "exact"})
        .order("tag", {ascending: true})

    if (tagsError) throw tagsError

    // Extract unique tags (Supabase might return duplicates if multiple reviews use the same tag)
    const uniqueTags = Array.from(new Set(tagsData?.map((t) => t.tag)))

    return (
        <div className={"flex w-full flex-col items-center justify-center p-8"}>

            <div className={"w-[500px] flex flex-col gap-3"}>
                <CreateNewReviewForm existingTags={uniqueTags}/>
            </div>

        </div>
    )
}