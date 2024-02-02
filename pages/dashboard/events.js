import Link from "next/link";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";
import Dropdown from "@/components/dropdown";
import { useState, useEffect } from "react";
import Dashboard_Event from "@/components/dashboard_event";
import { retrieveEvents } from "../api/events";
import { retrieveFields } from "../api/fields";
import LoadingPage from "@/components/loading";

const inter = Inter({ subsets: ["latin"] });

export default function Events() {

  const [allFilters, setAllFilters] = useState ({
    sortByProgram: [],
    sortByEventType: [],
    sortByStatus: [],
  });

  useEffect(() => {
    async function fetchFilters() {
      const sortByProgram = await retrieveFields("programs");
      const sortByEventType = await retrieveFields("eventtype");
      const sortByStatus = await retrieveFields("statuses");
      setAllFilters({
        sortByProgram: sortByProgram,
        sortByEventType: sortByEventType,
        sortByStatus: sortByStatus,
      });
    }

    async function fetchInitialData() {
      const upcoming = await retrieveEvents({ limit: 10 });
      setEventList(upcoming);
      setIsLoading(false);
    }

    fetchFilters();
    fetchInitialData();
    
  }, []);

  const sortedFiltersByName = Object.fromEntries(
    Object.entries(allFilters).map(([key, value]) => [
      key,
      value
        .map((item) => item && item.name ? [item.name, "#"] : [null, "#"])
        .sort((a, b) => {if (a[0] === null || b[0] === null) return 0; // Skip sorting if name is missing
        return a[0].localeCompare(b[0])}
),
    ])
  );

  console.log(sortedFiltersByName);

  const [isLoading, setIsLoading] = useState(true);
  const [eventList, setEventList] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const filteredEvents = await retrieveEvents({
        timeframe,
        sortByTime,
        sortByProgram,
        sortByEventType,
        sortByStatus,
      });
      setEventList(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <main className="flex bg-no-repeat bg-cover bg-center h-full w-full bg-black-900">
      <div className="flex h-screen w-1/6 sticky top-0">
        <Sidebar></Sidebar>
      </div>

      <div className="flex flex-col w-5/6 p-10 gap-3">
        <TitleBar>Events</TitleBar>

        <div className="flex flex-col w-full pt-4 gap-3">
          <div className="flex min-w-fit">
            <form className="flex gap-4" onSubmit={handleFormSubmit}>
              <Dropdown
                dropdown_name={"Timeframe"}
                input_options={[
                  ["Upcoming", "#"],
                  ["Historical", "#"],
                ]}
                onSelect={(value) => setTimeframe(value)}
              ></Dropdown>
              <Dropdown
                dropdown_name={"Sort by Time"}
                input_options={[
                  ["Earliest", "#"],
                  ["Latest", "#"],
                ]}
                onSelect={(value) => setSortByTime(value)}
              ></Dropdown>
              <Dropdown
                dropdown_name={"Sort by Program"}
                input_options={sortedFiltersByName.sortByProgram}
                onSelect={(value) => setSortByProgram(value)}
              ></Dropdown>
              <Dropdown
                dropdown_name={"Sort by Program Type"}
                input_options={sortedFiltersByName.sortByEventType}
                onSelect={(value) => setSortByEventType(value)}
              ></Dropdown>
              <Dropdown
                dropdown_name={"Sort by Status"}
                input_options={sortedFiltersByName.sortByStatus}
                onSelect={(value) => setSortByStatus(value)}
              ></Dropdown>

              <button type="submit" className="white-button">
                Filter
              </button>
            </form>

            <Link href={"events/new"} className="primary-button ml-auto">
              Create New Event
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-3 pb-10">
            {eventList.map((event_obj) => (
              <Dashboard_Event key={event_obj.id} eventObj={event_obj}></Dashboard_Event>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
