import React from "react";
import { cn } from "@/lib/utils";


export function ViewContainer({children, className}: any): React.ReactElement{
    return(
        <div className={cn("box-border mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
    )
} 