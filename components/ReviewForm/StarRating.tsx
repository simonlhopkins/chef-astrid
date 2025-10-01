"use client";

import * as React from "react";
import {Star} from "lucide-react";
import {cn} from "@/lib/utils";

interface StarRatingProps {
    value?: number;
    onChange?: (value: number) => void;
    max?: number;
}

export default function StarRating({value = 0, onChange, max = 5}: StarRatingProps) {
    const [hovered, setHovered] = React.useState<number | null>(null);

    return (

        <div className="flex items-center gap-1">
            {Array.from({length: max}).map((_, i) => {
                const starValue = i + 1;
                const filled = hovered !== null ? starValue <= hovered : starValue <= value;

                return (
                    <button
                        type="button"
                        key={i}
                        className="focus:outline-none"
                        onClick={() => onChange?.(starValue)}
                        onMouseEnter={() => setHovered(starValue)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <Star
                            className={cn(
                                "h-6 w-6 transition-colors",
                                filled ? "fill-chart-3 text-chart-3" : "text-gray-300"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}
