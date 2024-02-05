import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";
import ApplicationShortcut from "@/components/app_shortcut";

const inter = Inter({ subsets: ["latin"] });

export default function Apps() {
  return (
    <main className="flex bg-no-repeat bg-cover bg-center h-screen w-full bg-black-900">
      <div className="flex w-1/6">
        <Sidebar></Sidebar>
      </div>

      <div className="flex flex-col w-5/6 p-10">
        <TitleBar>Apps</TitleBar>
        <div className="flex flex-wrap pt-8 gap-4">
        <ApplicationShortcut
            image_url={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/1200px-Canva_icon_2021.svg.png"
            }
            link={"https://www.canva.com"}
            name={"Canva"}
          />

          <ApplicationShortcut
            image_url={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Eventbrite_Logo.svg/1280px-Eventbrite_Logo.svg.png"
            }
            link={"https://www.eventbrite.com/signin/"}
            name={"Eventbrite"}
          />

<ApplicationShortcut
            image_url={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Amadeus_%28CRS%29_Logo.svg/2560px-Amadeus_%28CRS%29_Logo.svg.png"
            }
            link={"https://venue.amadeus-hospitality.com/Account/SignIn"}
            name={"Amadeus"}
          />
          <ApplicationShortcut
            image_url={
              "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flickr_logo.png"
            }
            link={"https://identity.flickr.com/account-picker"}
            name={"Flickr"}
          />
          <ApplicationShortcut
            image_url={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/1024px-WordPress_blue_logo.svg.png"
            }
            link={"http://www.voices.uchicago.edu/ihouse/wp-admin"}
            name={"I-House Website"}
          />
          <ApplicationShortcut
            image_url={
              "https://upload.wikimedia.org/wikipedia/commons/c/cd/University_of_Chicago_Coat_of_arms.png"
            }
            link={"https://events.uchicago.edu"}
            name={"University Calendar"}
          />
          <ApplicationShortcut
            image_url={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1004px-Logo_of_YouTube_%282015-2017%29.svg.png?20200109235614"
            }
            link={"http://youtube.com"}
            name={"YouTube"}
          />
        </div>
      </div>
    </main>
  );
}
