import {createClient} from "@/lib/supabase/server";
import DeleteReviewButton from "@/app/reviews/[id]/DeleteReviewButton";
import {notFound} from "next/navigation";
import EditReviewButton from "@/app/reviews/[id]/EditReviewButton";
import {Star} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

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
        <div className="max-w-2xl flex flex-col gap-2 items-baseline">
            <h1 className="text-2xl font-bold">{review.name}</h1>
            {review.date_visited &&
                <p className="text-sm text-muted-foreground">
                    Visited on {new Date(review.date_visited).toLocaleDateString()}
                </p>}
            {review.google_place_id &&
                <Button variant={"outline"} asChild>
                    <Link href={`https://www.google.com/maps/place/?q=place_id:${review.google_place_id}`}
                          target={"_blank"}>
                        Google Maps Link
                    </Link>
                </Button>
            }
            <div className={"flex flex-row gap-2 w-full"}>
                {Array.from({length: review.rating}).map((_, i) => <Star className={"fill-primary"} key={i}/>)}
            </div>


            <p className="mt-4 whitespace-pre-line">{review.review_text}</p>
            <div className={"flex gap-2 mt-4"}>
                <DeleteReviewButton reviewId={review.id}/>
                <EditReviewButton reviewId={review.id}/>
            </div>

        </div>
    )
}