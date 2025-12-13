"use client"

import {Button} from "@/components/ui/button";

export default function GoogleMapsText() {

    const portlandLatLng = {lat: 45.5152, lng: -122.6784}
    const search = async () => {
        const {Place} = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
        const request = {
            textQuery: "brainium",
            fields: ['displayName', 'location', 'businessStatus'],
            includedType: '', // Restrict query to a specific type (leave blank for any).
            useStrictTypeFiltering: true,
            locationBias: portlandLatLng,
            language: 'en-US',
            maxResultCount: 8,
            minRating: 1, // Specify a minimum rating.
            region: 'us',
        };

        const {places} = await Place.searchByText(request);
        console.log("listing places");
        console.log(places)
        if (places.length > 0) {
            places.forEach(place => {
                console.log(place.location?.toString())
            });
        }

    }


    return (<Button onClick={() => {
        search();
    }}>search</Button>)
}