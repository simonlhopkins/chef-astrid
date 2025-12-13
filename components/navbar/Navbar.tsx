import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

export default async function Navbar() {
    return (
        <nav className={"m-2 w-full"}>
            <ul className={"flex justify-center m-2"}>
                <li>
                    <Button variant={"ghost"} asChild>
                        <Link href="/reviews">Reviews</Link>
                    </Button>
                </li>
                <li>
                    <Button variant={"ghost"} asChild>
                        <Link href="/map">Map</Link>
                    </Button>
                </li>
                <li>
                    <Button variant={"ghost"} asChild>
                        <Link href="/reviews/create">Create</Link>
                    </Button>
                </li>
            </ul>
            <Separator/>
        </nav>
        // <div className={"w-full flex justify-between p-2 relative"}>
        //    
        //     <Button asChild>
        //         <Link href={"/reviews"}>
        //             Home
        //         </Link>
        //     </Button>
        //
        //     <div className={"flex gap-2"}>
        //         <Button asChild>
        //             <Link href={"/reviews/create"}>
        //                 Create
        //             </Link>
        //         </Button>
        //         <LogoutButton/>
        //     </div>
        //
        // </div>

    )
}
