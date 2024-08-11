import React from "react";
import { cn } from "@/lib/utils";


export function ViewContainer({children, className}: any): React.ReactElement{
    return(
        <div className={cn("box-border, mx-auto w-[1100px] max-2xl:w-[1200px] max-xl:w-[920px] max-lg:w-[680px] max-md:w-[440px] max-sm:w-[340px]", className)}>{children}</div>
    )
} 