import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";
import UsersList from "@/components/users";

const inter = Inter({ subsets: ["latin"] });

export default function Users() {

  return (
    <main className="flex bg-no-repeat bg-cover bg-center h-full w-full bg-black-900">
      <div className="flex h-screen w-1/6 sticky top-0">
        <Sidebar></Sidebar>
      </div>

      <div className="flex flex-col w-5/6 p-10 gap-3">
        <TitleBar>Users</TitleBar>
        <UsersList></UsersList>
      </div>
    </main>
  );
}
