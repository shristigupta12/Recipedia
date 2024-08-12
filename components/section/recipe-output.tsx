"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import { useEffect, useState } from "react";

type RecipeType = {
    dishName: string;
    description: string;
    ingredients: string[];
    recipe: string[];
};

interface RecipeOutputProps {
    recipe: RecipeType[];
}




export function RecipeOutput({recipe}: RecipeOutputProps) : React.ReactElement{

    const [buttonDisplay, setButtonDisplay] = useState("hidden")
    useEffect(()=>{
        if(recipe.length!=0){
            setButtonDisplay("block")
        }else{
            setButtonDisplay("hidden")
        }
    }, [recipe])

    return(
        <Carousel className="relative">
                    <CarouselContent>
                            {recipe.map((obj, key)=>{
                                console.log("Rendering recipe item: ", obj);
                                return(
                                <CarouselItem className="recipe max-2xl:basis-1/2 max-sm:basis-full bg-white shadow-md rounded-md mx-5 p-4 flex flex-col gap-4" key={key}>
                                    <div>
                                        <div className="text-xl font-bold text-[#756253]">{obj.dishName}</div>
                                        <div className="text-neutral-500">{obj.description}</div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="font-semibold text-[#756253]">Ingredients:</div>
                                        <ul className="bg-[#dfd2c6] p-3  rounded-md grid grid-rows-4 items-center ">{obj.ingredients.map((ing, key1)=>(
                                            <li key={key1} className="text-sm ">{ing}</li>
                                        ))}</ul>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="font-semibold text-[#756253]">Recipe:</div>
                                        <ol>{obj.recipe.map((recipePoints, key2)=>(
                                            <li key={key2} className="text-sm">{recipePoints}</li>
                                        ))}</ol>
                                    </div>
                                </CarouselItem >
                            )})}
                             
                    </CarouselContent>
                    <CarouselPrevious className={`${buttonDisplay} text-center absolute `} />
                    <CarouselNext className={buttonDisplay}/>
                </Carousel>
    )
}