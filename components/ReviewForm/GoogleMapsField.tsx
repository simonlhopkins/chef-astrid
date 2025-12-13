"use client"


import {FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useFormContext} from "react-hook-form";
import * as React from "react";
import {useState} from "react";
import {Button} from "@/components/ui/button";

interface Props {
    name: string
    query: string;
}

export default function GoogleMapsField({query, name}: Props) {
    const {control} = useFormContext();
    const [results, setResults] = useState<google.maps.places.Place[]>([])
    return (
        <FormField
            name={name}
            control={control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Google Location</FormLabel>
                    <Button disabled={query.length == 0} onClick={async (e) => {
                        e.preventDefault()
                        const searchResults = await SearchOnGoogleMaps(query);
                        setResults(searchResults);
                    }}>{query.length > 0 ? `Search For Location based on ${query}` : "Type Restaurant Name to Search"}</Button>
                    <ul>
                        {results.map((item) =>
                            <li key={item.id}>
                                <Button onClick={(e) => {
                                    e.preventDefault()
                                    field.onChange(item.id)
                                }}>
                                    {item.displayName}, {item.formattedAddress}
                                </Button>
                            </li>)}
                    </ul>
                    <p>Place Id: {field.value || "None"}</p>
                </FormItem>)}
        >

        </FormField>
    )
}

async function SearchOnGoogleMaps(query: string) {
    const {Place} = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const request = {
        textQuery: query,
        fields: ['displayName', 'location', 'formattedAddress'],
        includedType: '', // Restrict query to a specific type (leave blank for any).
        useStrictTypeFiltering: true,
        language: 'en-US',
        maxResultCount: 8,
        minRating: 1, // Specify a minimum rating.
        region: 'us',
    };

    const {places} = await Place.searchByText(request);
    return places;

}