import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";

const inter = Inter({ subsets: ["latin"] });

export default function Apps() {
  return (
    <main className="flex bg-no-repeat bg-cover bg-center h-screen w-full bg-black-900">
      
      <div className="flex w-1/6"><Sidebar></Sidebar></div>

      <div className="flex w-5/6 p-10">

        <TitleBar>Apps</TitleBar>

      </div>
    </main>
  );
}
