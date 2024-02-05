import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";
import Dashboard_Event from "@/components/dashboard_event";
import { useState, useEffect } from "react";
import { retrieveEvents } from "./api/events";
import LoadingPage from "@/components/loading";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {

  const { data: session } = useSession();
  const userName = session?.user?.name

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [actionItems, setactionItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const upcoming = await retrieveEvents({
          timeframe: "upcoming",
          limit: 9,
        });
        setUpcomingEvents(upcoming);
        const foraction = await retrieveEvents({
          timeframe: "upcoming",
          status: "Pending",
          limit: 9,
        });
        setactionItems(foraction);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingPage></LoadingPage>
      </div>
    );
  }

  return (
    <main className="flex bg-no-repeat bg-cover bg-center h-full w-full bg-black-900">
      <div className="flex h-screen w-1/6 sticky top-0">
        <Sidebar></Sidebar>
      </div>

      <div className="flex flex-col w-5/6 p-10 gap-3">
        <TitleBar>Welcome {userName}</TitleBar>

        <div className="flex flex-col w-full border p-10 gap-5 border-white-100 text-white-100">
          <div>
            <h1>Upcoming Events</h1>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event) => (
              <Dashboard_Event key={event.id} eventObj={event}></Dashboard_Event>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full border p-10 gap-5 border-white-100 text-white-100">
          <div>
            <h1>Action Items</h1>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {actionItems.map((event) => (
              <Dashboard_Event key={event.id} eventObj={event}></Dashboard_Event>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
