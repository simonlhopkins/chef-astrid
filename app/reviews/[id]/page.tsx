import {createClient} from "@/lib/supabase/server";
import DeleteReviewButton from "@/app/reviews/[id]/DeleteReviewButton";
import {notFound} from "next/navigation";
import EditReviewButton from "@/app/reviews/[id]/EditReviewButton";
import {Star} from "lucide-react";

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({params}: Props) {

    const {id} = await params;
    const supabase = await createClient()

    const {data: review, error} = await supabase
        .from("reviews")
        .select(`
      *`)
        .eq("id", id)
        .single()

    if (error || !review) {
        notFound();
    }

    return (
        <div className="max-w-2xl flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{review.name}</h1>
            {review.date_visited &&
                <p className="text-sm text-muted-foreground">
                    Visited on {new Date(review.date_visited).toLocaleDateString()}
                </p>}

            <div className={"flex flex-row gap-2 w-full"}>
                {Array.from({length: review.rating}).map((_, i) => <Star className={"fill-primary"} key={i}/>)}
            </div>
            <div className={"flex gap-2"}>
                <DeleteReviewButton reviewId={review.id}/>
                <EditReviewButton reviewId={review.id}/>
            </div>
            <p className="mt-4 whitespace-pre-line">{review.review_text}</p>


        </div>
    )
}