import {LogoutButton} from "@/components/logout-button";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function Navbar() {
    return (
        <div className={"w-full flex justify-between p-2 relative"}>
            <Button asChild>
                <Link href={"/reviews"}>
                    Home
                </Link>
            </Button>

            <div className={"flex gap-2"}>
                <Button asChild>
                    <Link href={"/reviews/create"}>
                        Create
                    </Link>
                </Button>
                <LogoutButton/>
            </div>

        </div>

    )
}