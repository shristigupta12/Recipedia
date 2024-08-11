import React from "react"

export function Navbar():React.ReactElement {
    return(
        <nav className="p-4  ">
            <div className=" text-amber-950 p-1 rounded-md  font-medium  text-2xl flex items-center w-fit gap-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tools-kitchen-2" width="30" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(38 38 38 / var(--tw-text-opacity))" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
                </svg>
                Recipedia
            </div>
            
        </nav>
    )
}