"use client"

import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

export default function CreatePostButton() {
    return <Button onClick={() => {
        redirect("/reviews/create");
    }}>Create</Button>
}