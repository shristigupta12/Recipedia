// import Image from "next/image";

import { Navbar } from "@/components/section/navbar";
import { RecipeTable } from "@/components/section/recipe-table";


export default function Home() {
  return (
    <div>
      <Navbar />
      <RecipeTable />
    </div>
  );
}
