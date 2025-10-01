import ReviewCard from "@/components/ReviewCard";
import {createClient} from "@/lib/supabase/server";


async function getAllReviews(tagsFilter: string[] | null = null) {
    const supabase = await createClient()

    // Get current user
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) throw new Error("Not logged in")

    // Fetch reviews along with tags
    const query = supabase
        .from("reviews")
        .select(`
        *,
        review_tags(tag)
      `)
        .eq("user_id", user.id)
        .order("created_at", {ascending: false})

    const {data, error} = await query;
    if (error) throw error
    // Optionally, format so each review has a simple array of strings for tags
    const formatted = data.map((review) => ({
        ...review,
        tags: review.review_tags?.map((t) => t.tag) || [],
        review_tags: undefined, // remove the nested array if you don't need it
    }))
    const filtered = tagsFilter ? formatted.filter(review => review.tags.some(reviewTag => tagsFilter.includes(reviewTag))) : formatted;
    return filtered
}

interface Props {
    searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function ReviewsPage({searchParams}: Props) {
    const tagsParam = (await searchParams).tags
    console.log(tagsParam)
    const data = await getAllReviews(tagsParam?.split(","));

    return <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {data?.map(entry =>
            <ReviewCard
                key={entry.id}
                restaurantName={entry.name}
                rating={entry.rating}
                reviewText={entry.review_text || ""}
                tags={entry.tags}
                id={entry.id}
            />)
        }
    </div>

}