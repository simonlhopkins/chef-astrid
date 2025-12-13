import {Button} from "@/components/ui/button";
import Link from "next/link";
import GoogleMapsText from "@/app/GoogleMapsText";


export default async function Home() {

    return (
        <div className={"space-y-2"}>
            <h1 className={"text-3xl mb-2"}>Happy Anniversary Kendra 💖</h1>
            <p>this is a restaurant blog that only YOU can use!</p>
            <p>Click <span><Button asChild><Link href={"/reviews"}>Here</Link></Button></span> to go to your reviews
                page.</p>
            <p>Create a review by clicking on the &quot;Create&quot; button in the upper right hand corner.</p>
            <GoogleMapsText/>
            <img src="/astrid_grass.jpeg" alt=""/>
        </div>
    );
}
