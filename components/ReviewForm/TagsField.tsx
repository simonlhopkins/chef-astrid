"use client"

import * as React from "react"
import {useState} from "react"
import {useFormContext} from "react-hook-form"
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {X} from "lucide-react"
import {Badge} from "@/components/ui/badge";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface TagsFieldProps {
    name: string
    suggestions: string[] // preload tags from DB
}

export function TagsField({name, suggestions}: TagsFieldProps) {
    const {control} = useFormContext()
    const [inputValue, setInputValue] = useState("")
    const [searchValue, setSearchValue] = useState<string>("");

    const [open, setOpen] = React.useState(false)


    const reset = () => {
        setOpen(false)
        setInputValue("");
    }
    return (
        <FormField
            name={name}
            control={control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <div className="space-y-2">
                            {/* Selected tags */}
                            <div className="flex flex-wrap gap-2">
                                {field.value?.map((tag: string) => (
                                    <Badge
                                        key={tag}
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                field.onChange(field.value.filter((t: string) => t !== tag))
                                            }
                                        >
                                            <X className="h-3 w-3 text-gray-600 hover:text-accent"/>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger>
                                    <Input
                                        onChange={event => {
                                            setInputValue(event.target.value)
                                        }}
                                        value={inputValue}
                                        placeholder="Add a tag..."
                                        onKeyDown={event => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                field.onChange(Array.from(new Set([...field.value, inputValue])))
                                                reset()
                                            }
                                        }}
                                    />
                                </PopoverTrigger>
                                <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-[200px] p-0">
                                    <div className={"flex flex-col"}>
                                        <Button onClick={() => {
                                            field.onChange(Array.from(new Set([...field.value, inputValue])))
                                            setOpen(false)
                                        }}

                                                variant={"ghost"}
                                                className={cn(inputValue.length > 0 ? "block" : "hidden")}

                                        >
                                            Add Tag: &quot;{inputValue}&quot;
                                        </Button>
                                        {suggestions.filter(item => !field.value.includes(item) && inputValue.length > 0 && item.startsWith(inputValue)).map((suggestion) => (
                                            <Button
                                                key={suggestion}
                                                value={suggestion}
                                                variant={"ghost"}
                                                onClick={() => {
                                                    field.onChange(Array.from(new Set([...field.value, suggestion])))
                                                    reset()
                                                }}
                                            >
                                                {suggestion}
                                            </Button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            {/*<Command className={"relative overflow-visible"}>*/}
                            {/*    <CommandInput value={inputValue}*/}
                            {/*                  onValueChange={(value) => {*/}
                            {/*                      setInputValue(value)*/}
                            {/*                  }}*/}
                            {/*                  onKeyDown={(e) => {*/}
                            {/*                      if (e.key === "Enter" && inputValue.trim()) {*/}
                            {/*                          e.preventDefault()*/}
                            {/*                          if (!field.value.includes(inputValue)) {*/}
                            {/*                              field.onChange([...field.value, inputValue.trim()])*/}
                            {/*                          }*/}
                            {/*                          setInputValue("")*/}
                            {/*                      }*/}
                            {/*                  }}*/}
                            {/*                  placeholder="Type a command or search..."/>*/}
                            {/*    <CommandList className={"absolute top-full bg-background"}>*/}
                            {/*        <CommandEmpty>No results found.</CommandEmpty>*/}
                            {/*        <CommandGroup heading="Suggestions">*/}
                            {/*            {suggestions*/}
                            {/*                .filter(*/}
                            {/*                    (tag) =>*/}
                            {/*                        tag.toLowerCase().includes(inputValue.toLowerCase()) &&*/}
                            {/*                        !field.value.includes(tag)*/}
                            {/*                )*/}
                            {/*                .map((tag) => (*/}
                            {/*                    <CommandItem*/}
                            {/*                        key={tag}*/}
                            {/*                        onSelect={() => {*/}
                            {/*                            field.onChange([...field.value, tag])*/}
                            {/*                            setInputValue("")*/}
                            {/*                        }}*/}
                            {/*                    >*/}
                            {/*                        {tag}*/}
                            {/*                    </CommandItem>*/}
                            {/*                ))}*/}

                            {/*        </CommandGroup>*/}
                            {/*    </CommandList>*/}
                            {/*</Command>*/}
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}
