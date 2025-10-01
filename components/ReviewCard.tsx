import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Star} from "lucide-react";
import Link from "next/link";

interface Props {
    restaurantName: string,
    reviewText: string,
    rating: number,
    tags: string[],
    id: string
}

export default function ReviewCard({restaurantName, reviewText, rating, tags, id}: Props) {

    return <Card title="Review Card" className={"max-h-64 overflow-hidden"}>
        <CardHeader>
            <CardTitle className="text-2xl">
                <Link className={"hover:underline"} href={`/reviews/${id}`}>{restaurantName}</Link>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-wrap gap-2 w-full"}>
                    {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                </div>
                <div className={"flex flex-row gap-2 w-full"}>
                    {Array.from({length: rating}).map((_, i) => <Star key={i}/>)}
                </div>
                <p className={"line-clamp-3"}>{reviewText}</p>
            </div>

        </CardContent>
    </Card>
}

