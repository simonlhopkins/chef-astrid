"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Database} from "@/database.types";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Textarea} from "@/components/ui/textarea";
import {createClient} from "@/lib/supabase/client";
import {TagsField} from "@/components/ReviewForm/TagsField";
import StarRating from "@/components/ReviewForm/StarRating";


const reviewFormSchema = z.object({
    restaurantName: z.string().min(2).max(50),
    date_visited: z.date({
        error: "Please enter a valid date.",
    }),
    review: z
        .string()
        .min(10, {
            message: "Review must be at least 10 characters.",
        })
        .max(1500, {
            message: "Review must not be longer than 1500 characters.",
        }),
    rating: z
        .number()
        .min(1, "Please select at least 1 star")
        .max(5, "Rating must be between 1 and 5"),
    tags: z
        .array(
            z
                .string()
                .min(1, "Tag cannot be empty")
                .max(30, "Tag must be at most 30 characters")
        )
        .max(10, "You can add up to 10 tags"),
})

export type ReviewFormSchemaType = z.infer<typeof reviewFormSchema>;


type ReviewUpdate = Database["public"]["Tables"]["reviews"]["Update"]

export async function updateReview(
    reviewId: string,
    updates: ReviewUpdate,
    tags: string[]
) {
    const supabase = createClient()

    const {data, error} = await supabase
        .from("reviews")
        .update(updates)       // 👈 only updates provided fields
        .eq("id", reviewId)    // 👈 where id = reviewId
        .select()              // 👈 return updated row(s)

    if (error) {
        console.error("Update review error:", error.message)
        throw error
    }

    await supabase.from("review_tags").delete().eq("review_id", reviewId)
    await supabase.from("review_tags").insert(tags.map(tag => ({review_id: reviewId, tag})))

    return data[0]
}

type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"]

interface Props {
    tags: string[],
    onFormSubmit: (data: ReviewFormSchemaType) => void
    defaultValues?: ReviewRow & { tags: string[] }
}


export default function ReviewForm({tags, defaultValues, onFormSubmit}: Props) {
    // 1. Define your form.

    const form = useForm<ReviewFormSchemaType>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            restaurantName: defaultValues?.name ?? "",
            date_visited: new Date(defaultValues?.date_visited ?? Date.now()),
            review: defaultValues?.review_text ?? "",
            rating: defaultValues?.rating ?? 0,
            tags: defaultValues?.tags ?? []
        },
    })

    // 2. Define a submit handler.

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="restaurantName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Restaurant Name</FormLabel>
                            <FormControl>
                                <Input placeholder="restaurant name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Name of the restaurant you visited
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date_visited"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date Visited</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                The date you visted the restaurant
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <StarRating value={field.value} onChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <TagsField name={"tags"} suggestions={tags}/>
                <FormField
                    control={form.control}
                    name="review"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                write a review of the restaurant
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button disabled={form.formState.isSubmitting}
                        type="submit">{form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    )

}