"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function CreatePostButton() {
    return (
        <Button asChild>
            <Link href={"/reviews/create"}>
                Create
            </Link>
        </Button>
    )

}