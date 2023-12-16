import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleLogin = (provider) => () => {
    signIn(provider);
  };

  return (
    <main
      className="flex items-center justify-center bg-[url('/img/ihouse-background.jpg')] bg-no-repeat bg-cover bg-center h-screen w-full"
    >
      <div className="flex flex-col items-center justify-center w-1/2 h-2/5 min-h-fit p-10 bg-black-900 text-white-100">
        <div className="flex w-1/2 pb-10">
        <Image src={"/img/UChicago_IHO_Horizontal_White RGB.png"} layout="responsive" width={290} height={71}></Image>
        </div>
        <div className="white-button" onClick={handleLogin('google')}>
          Login with UChicago SSO (Via Google)
        </div>

        <Link href={"mailto:mkulma@uchicago.edu"}>
        <div className="text-white-100 pt-5 hover:underline">
          Request Access
        </div>
        </Link>
      </div>
    </main>
  );
}
