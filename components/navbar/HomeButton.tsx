"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function HomeButton() {
    return (
        <Button asChild>
            <Link href={"/reviews"}>
                Home
            </Link>
        </Button>
    )
}