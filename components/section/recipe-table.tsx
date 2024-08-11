"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import { PageContent } from "../layout/page-content";
import { ViewContainer } from "../layout/view-container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { RecipeOutput } from "./recipe-output";
import { getRecipies } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast"

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
    const [loaderDisplay, setLoaderDisplay] = useState("hidden")
    const { toast } = useToast()

    useEffect(() => {
        console.log("Updated recipe state: ", recipe);
    }, [recipe]);

    function containsNumber(str:string) {
        const regex = /\d/;
        return regex.test(str);
    }
    function containsLetter(str:string) {
        const regex = /[a-zA-Z]/;
        return regex.test(str);
    }

    function handleIngredientChange(e:any){
        setIngredient(e.target.value)
    }

    function handleCuisineChange(e:any){
        setCuisine(e.target.value)
    }

    function addIngredient(){

        if(ingredientsArray.length==10){
            toast({
                description: "You cannot add more than 10 ingredients"
            })
            return;
        }
        if(ingredient!="" && !ingredientsArray.includes(ingredient) && containsLetter(ingredient) && !containsNumber(ingredient)){
            setIngredientsArray([...ingredientsArray, ingredient])
            setIngredient("")
            return;
        }
        toast({
            description: "Please enter a valid ingredient"
        })
        return;
    }

    function removeIngredient(indexToRemove: number){
        setIngredientsArray(prevIngredients => 
            prevIngredients.filter((_, index) => index !== indexToRemove)
        );
    }

    async function onSubmit() {
        console.log("submit button click")
        if (ingredientsArray.length === 0) {
            console.log("ingredientsArray is empty")
            toast({
                description: "Please add ingredients"
            })
            return; // Exit the function early
        }

        if(cuisine == ""){
            toast({
                description: "Please enter cuisine"
            })
            return;
        }
        
        setLoaderDisplay("block")
        try {
            var response = await getRecipies(ingredientsArray, cuisine)
            console.log("response in client: ", response)
            
            // Check if the response is in the correct format
            if (!Array.isArray(response) || response.length === 0 || !isValidRecipeFormat(response[0])) {
                throw new Error("Invalid response format");
            }
            
            setRecipe(response)
        } catch (error) {
            console.error("Error fetching recipes:", error)
            toast({
                title: "Error",
                description: "An error occurred while fetching recipes. Please try again."
            })
        } finally {
            setLoaderDisplay("hidden")
        }
    }

    function isValidRecipeFormat(recipe: any): recipe is RecipeType {
        return (
            typeof recipe === 'object' &&
            typeof recipe.dishName === 'string' &&
            typeof recipe.description === 'string' &&
            Array.isArray(recipe.ingredients) &&
            Array.isArray(recipe.recipe)
        );
    }   

    return(
        <PageContent>
            <ViewContainer className="bg-neutral-100 rounded-md shadow-lg py-6 px-8 flex flex-col gap-7 text-neutral-600  border-x-neutral-500 ">
                <div className="input-portion flex flex-col gap-6">
                    <div className="cuisine-input flex items-center justify-center gap-3">
                        <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chef-hat" width="24" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="rgb(136 111 92 / var(--tw-text-opacity))" stroke-linecap="round" stroke-linejoin="round">
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
                                <div>{`Let's put ingredients on table`}</div>
                                <Image src="/carrot.svg" width={23} height={23} alt="carrot" />
                            </div>
                            <Input className="ingredient-input w-60 shadow-md" onChange={handleIngredientChange} value={ingredient}></Input>
                            <Button className="w-fit mt-3 bg-[#756253] hover:bg-[#b3937a] flex shadow-md" onClick={addIngredient}>Add</Button>
                        </div>

                        <div className="table w-4/6 h-60 relative bg-[#b3937a] shadow-md rounded-md">
                            <div className="absolute w-full h-full grid grid-cols-12 opacity-15  ">
                                {arr.map((arrkey)=>{return(
                                <div className="border border-neutral-200 " key={arrkey}> </div>
                                )})}
                            </div>
                            <div className="p-5 grid grid-cols-4 justify-evenly items-center">
                                {ingredientsArray.map((ing, index)=>(
                                    <div key={index} className="relative bg-white rounded-md py-2 w-fit px-4 text-[#756253]">{ing}<button className="absolute bg-neutral-300 text-neutral-500 rounded-full w-4 h-4 text-xs top-[-2px] right-[-2px]" onClick={()=>removeIngredient(index)}>x</button></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <Button type="submit" className="w-fit bg-white hover:bg-neutral-200 flex text-[#756253] font-bold border border-[#a8907e] shadow-md" onClick={()=>onSubmit()} >Get Recipies ✨</Button>
                    </div>

                    <div role="status" className={`${loaderDisplay} mx-auto`}>
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#756253]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                
                
                <RecipeOutput recipe={recipe} />
                
            </ViewContainer>
        </PageContent>
    )
}