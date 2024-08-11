import React from "react";
import { cn } from "@/lib/utils";


export function PageContent({children, className}: any): React.ReactElement{
    return(
        <div className={cn("py-6", className)}>{children}</div>
    )
} 