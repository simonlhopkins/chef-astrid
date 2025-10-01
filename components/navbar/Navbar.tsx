import CreatePostButton from "@/components/navbar/CreatePostButton";
import {createClient} from "@/lib/supabase/server";
import {LogoutButton} from "@/components/logout-button";
import HomeButton from "@/components/navbar/HomeButton";

export default async function Navbar() {
    const supabase = await createClient();
    const {data} = await supabase.auth.getClaims();
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