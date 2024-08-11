'use server'

import { ChatOpenAI } from "@langchain/openai"

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function getRecipies(ingredientsArray:string[], cuisine:string){
    console.log("inside fetch function")
    var prompt = `Generate top five recipies based on the ingredients contained in this array ${ingredientsArray} in ${cuisine} cuisine. The output should be JSON array of recipies and each object should contain a recipe field named 'dishName', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'recipe `;

    const response = await chatModel.invoke(prompt)
    console.log(JSON.parse(response.content as string))
    return JSON.parse(response.content as string);
}