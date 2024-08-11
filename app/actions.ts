'use server'
import { ChatOpenAI } from "@langchain/openai"

export async function getRecipies(ingredientsArray:string[], cuisine:string){
    try {
        console.log("inside fetch function")
        const chatModel = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY
        })

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not set")
        }

        var prompt = `Generate top five recipies based on the ingredients contained in this array ${ingredientsArray} in ${cuisine} cuisine. The output should be JSON array of recipies and each object should contain a recipe field named 'dishName', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'recipe `;
        
        const response = await chatModel.invoke(prompt)
        
        const parsedResponse = JSON.parse(response.content as string)
        console.log(parsedResponse)
        return parsedResponse;
    } catch (error) {
        console.error("Error in getRecipies:", error)
        throw error // Re-throw the error to be handled by Next.js error boundary
    }
}