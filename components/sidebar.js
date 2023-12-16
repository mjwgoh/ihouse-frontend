import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useRequireAuth } from '../hooks/useRequireAuth';

const inter = Inter({ subsets: ["latin"] });

export default function Sidebar() {

  const router = useRouter();
  const { asPath }= router;

  const session = useRequireAuth();

  if (!session) {
    return <p>You are not logged in...</p>; // Or some loading indicator
  }
  
  return (
    <div>
      <div className="flex flex-col border-r border-r-white-100 h-screen">
        <div className="flex justify-center items-center p-10 py-8 border-b">
          <Image
            src={"/img/UChicago_IHO_Horizontal_White RGB.png"}
            layout="responsive"
            width={290}
            height={71}
          ></Image>
        </div>
        <Link href={"/dashboard"}><div className={`side-menu-button ${asPath === '/dashboard' ? 'bg-primary' : ''}`}>Dashboard</div></Link>
        <Link href={"/dashboard/apps"}><div className={`side-menu-button ${asPath === '/dashboard/apps' ? 'bg-primary' : ''}`}>Apps</div></Link>
        <Link href={"/dashboard/events"}><div className={`side-menu-button ${asPath === '/dashboard/events' ? 'bg-primary' : ''}`}>Events</div></Link>
        <Link href={"/dashboard/users"}><div className={`side-menu-button ${asPath === '/dashboard/users' ? 'bg-primary' : ''}`}>Users</div></Link>
        <Link href={"/dashboard/admin"}><div className={`side-menu-button ${asPath === '/dashboard/admin' ? 'bg-primary' : ''}`}>Admin</div></Link>
        <div className="flex-grow"></div>
        <div onClick={() => signOut({ callbackUrl: '/' })} className="flex p-5 justify-center text-white-100 hover:underline hover:cursor-pointer text-sm">
          Logout
        </div>
      </div>
    </div>
  );
}
