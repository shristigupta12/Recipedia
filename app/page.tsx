// import Image from "next/image";

import { Navbar } from "@/components/section/navbar";
import { RecipeTable } from "@/components/section/recipe-table";


export default function Home() {
  return (
    <div className="bg-[#dfd2c6] h-[100vh]">
      <Navbar />
      <RecipeTable />
    </div>
  );
}
