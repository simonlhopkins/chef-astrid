import CreatePostButton from "@/components/navbar/CreatePostButton";
import {LogoutButton} from "@/components/logout-button";
import HomeButton from "@/components/navbar/HomeButton";

export default async function Navbar() {
    return (
        <div className={"w-full flex justify-between p-2 relative"}>
            <HomeButton/>

            <div className={"flex gap-2"}>
                <CreatePostButton/>
                <LogoutButton/>
            </div>

        </div>

    )
}