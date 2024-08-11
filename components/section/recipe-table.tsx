import React from "react";
import { PageContent } from "../layout/page-content";
import { ViewContainer } from "../layout/view-container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


export function RecipeTable(): React.ReactElement {

    const arr = Array(144).fill(0);


    return(
        <PageContent>
            <ViewContainer className="bg-neutral-100 rounded-md shadow-lg py-6 px-8 flex flex-col gap-7 text-neutral-600  border-x-neutral-500 ">
                <div className="input-portion flex flex-col gap-6">
                    <div className="cuisine-input flex items-center justify-center gap-3">
                        <div >Enter cuisine of your choice</div>
                        <Input className=" w-60"></Input>
                    </div>

                    <div className="ingredients-input flex justify-between items-center gap-3">
                        <div className="input-ingredients w-fit flex flex-col gap-2">
                            <div>Put the ingredients on the table</div>
                            <Input className=" w-60 "></Input>
                        </div>

                        <div className="table w-4/6 h-60 relative bg-[#b3937a] shadow-md rounded-md">
                            <div className="absolute w-full h-full grid grid-cols-12 opacity-15  ">
                                {arr.map((key)=>{return(
                                <div className="border border-neutral-200 " key={key}> </div>
                                )})}
                            </div>
                            <div></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <Button className="w-fit bg-[#756253] hover:bg-[#b3937a] flex">Get Recipies ✨</Button>
                    </div>
                </div>

                <div className="output-portion">

                </div>
            </ViewContainer>
        </PageContent>
    )
}