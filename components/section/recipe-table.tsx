"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import { PageContent } from "../layout/page-content";
import { ViewContainer } from "../layout/view-container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

type RecipeType = {
    dishName: string;
    description: string;
    ingredients: string[];
    recipe: string[];
};

export function RecipeTable(): React.ReactElement {

    const arr = Array(144).fill(0);

    const [ingredient, setIngredient] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [ingredientsArray, setIngredientsArray] = useState<string[]>([])
    const [recipe, setRecipe] = useState<RecipeType[]>([])

    useEffect(()=>{
    setRecipe([
        {
            dishName: "Pav Bhaji",
            description: "A spicy blend of vegetables cooked in tomato gravy and served with buttered pav.",
            ingredients: ["potatoes", "tomatoes", "onions", "capsicum", "butter", "spices"],
            recipe: [
                "Boil and mash the vegetables.",
                "Heat butter in a pan and add onions.",
                "Add tomatoes and cook until soft.",
                "Add the mashed vegetables and spices.",
                "Cook everything together and serve with buttered pav."
            ]
        },
        {
            dishName: "Biryani",
            description: "A fragrant rice dish made with layers of marinated meat, fried onions, and fragrant rice.",
            ingredients: ["basmati rice", "chicken", "yogurt", "spices", "onions", "ghee"],
            recipe: [
                "Marinate the chicken with yogurt and spices.",
                "Fry onions until golden brown.",
                "Cook rice until 70% done.",
                "Layer the marinated chicken and rice, adding fried onions between layers.",
                "Cook on low heat until the rice is fully cooked and the chicken is tender."
            ]
        },
        {
            dishName: "Butter Chicken",
            description: "A rich and creamy dish made with marinated chicken cooked in a spiced tomato gravy.",
            ingredients: ["chicken", "tomatoes", "butter", "cream", "spices", "garlic"],
            recipe: [
                "Marinate the chicken in yogurt and spices.",
                "Cook tomatoes with spices to make the gravy.",
                "Add butter and cream to the gravy.",
                "Cook the marinated chicken in the gravy until tender.",
                "Serve with naan or rice."
            ]
        },
        {
            dishName: "Chole Bhature",
            description: "A classic North Indian dish consisting of spicy chickpeas (chole) and deep-fried bread (bhature).",
            ingredients: ["chickpeas", "onions", "tomatoes", "spices", "flour", "yogurt", "baking powder", "oil"],
            recipe: [
                "Soak the chickpeas overnight and cook them until tender.",
                "Prepare the bhature dough by mixing flour, yogurt, baking powder, and a pinch of salt.",
                "Let the dough rest for a few hours.",
                "Prepare the chole by cooking onions and tomatoes with spices to create a rich gravy.",
                "Add the cooked chickpeas to the gravy and let it simmer.",
                "Divide the dough into balls, roll them out, and deep-fry until golden brown.",
                "Serve the chole with hot bhature."
            ]
        }
    ])
})

    function handleIngredientChange(e:any){
        setIngredient(e.target.value)
    }

    function handleCuisineChange(e:any){
        setCuisine(e.target.value)
    }

    function addIngredient(){
        if(ingredient!="" && !ingredientsArray.includes(ingredient)){
            setIngredientsArray([...ingredientsArray, ingredient])
            setIngredient("")
        }
    }

    function getRecipies(){

    }

    return(
        <PageContent>
            <ViewContainer className="bg-neutral-100 rounded-md shadow-lg py-6 px-8 flex flex-col gap-7 text-neutral-600  border-x-neutral-500 ">
                <div className="input-portion flex flex-col gap-6">
                    <div className="cuisine-input flex items-center justify-center gap-3">
                        <div className="flex items-center">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chef-hat" width="24" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" fill="rgb(136 111 92 / var(--tw-text-opacity))" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4 4 0 1 1 2.092 -7.723a4 4 0 0 1 3.908 -3.151z" />
                                <path d="M6.161 17.009l11.839 -.009" />
                            </svg>
                            <div >Enter a cuisine of your choice</div>
                        </div>
                        <Input className=" w-60 shadow-md" onChange={handleCuisineChange} value={cuisine}></Input>
                    </div>

                    <div className="ingredients-input flex justify-between items-center gap-3">
                        <div className="input-ingredients w-fit flex flex-col gap-1">
                            <div className="flex items-center justify-center">
                                <div>Add ingredients on the table</div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-carrot" width="25" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7f5345" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M3 21s9.834 -3.489 12.684 -6.34a4.487 4.487 0 0 0 0 -6.344a4.483 4.483 0 0 0 -6.342 0c-2.86 2.861 -6.347 12.689 -6.347 12.689z" />
                                    <path d="M9 13l-1.5 -1.5" />
                                    <path d="M16 14l-2 -2" />
                                    <path d="M22 8s-1.14 -2 -3 -2c-1.406 0 -3 2 -3 2s1.14 2 3 2s3 -2 3 -2z" />
                                    <path d="M16 2s-2 1.14 -2 3s2 3 2 3s2 -1.577 2 -3c0 -1.86 -2 -3 -2 -3z" />
                                </svg>
                            </div>
                            <Input className="ingredient-input w-60 shadow-md" onChange={handleIngredientChange} value={ingredient}></Input>
                            <Button className="w-fit mt-3 bg-[#756253] hover:bg-[#b3937a] flex shadow-md" onClick={addIngredient}>Add</Button>
                        </div>

                        <div className="table w-4/6 h-60 relative bg-[#b3937a] shadow-md rounded-md">
                            <div className="absolute w-full h-full grid grid-cols-12 opacity-15  ">
                                {arr.map((key)=>{return(
                                <div className="border border-neutral-200 " key={key}> </div>
                                )})}
                            </div>
                            <div>
                                {ingredientsArray.map((ing, index)=>(
                                    <div key={index}>{ing}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <Button className="w-fit bg-white hover:bg-neutral-200 flex text-[#756253] font-bold border border-[#a8907e] shadow-md" onClick={getRecipies}>Get Recipies ✨</Button>
                    </div>
                </div>

                <Carousel>
                    <CarouselContent>
                            {recipe.map((obj, key)=>(
                                <CarouselItem className="recipe basis-1/2 bg-white shadow-md rounded-md mx-5 p-4 flex flex-col gap-4" key={key}>
                                    <div>
                                        <div className="text-xl">{obj.dishName}</div>
                                        <div className="text-neutral-500">{obj.description}</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Ingredients:</div>
                                        <ul className="bg-neutral-300 items-center p-3">{obj.ingredients.map((ing, key1)=>(
                                            <li key={key1}>{ing}</li>
                                        ))}</ul>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Recipe:</div>
                                        <ol>{obj.recipe.map((recipePoints, key2)=>(
                                            <li key={key2}>{recipePoints}</li>
                                        ))}</ol>
                                    </div>
                                </CarouselItem >
                            ))}
                             
                    </CarouselContent>
                    <CarouselPrevious />
                             <CarouselNext />
                </Carousel>
            </ViewContainer>
        </PageContent>
    )
}