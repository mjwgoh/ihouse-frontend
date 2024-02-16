import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";
import Dropdown from "@/components/dropdown";
import { submitNewEvent } from "@/pages/api/event";
import { retrieveFields } from "@/pages/api/fields";
import LoadingPage from "@/components/loading";
import CheckboxList from "@/components/processChecklist";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Events() {
  const [allFields, setAllFields] = useState({
    programs: [],
    statuses: [],
    cosponsors: [],
    caterers: [],
    rooms: [],
    audioVisual: [],
    eventtype: [],
    partners: []
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      const programs = await retrieveFields("programs");
      const statuses = await retrieveFields("statuses");
      const cosponsors = await retrieveFields("cosponsors");
      const caterers = await retrieveFields("caterers");
      const rooms = await retrieveFields("rooms");
      const audioVisual = await retrieveFields("av");
      const eventtype = await retrieveFields("eventtype");
      const partners = await retrieveFields("partners");

      setAllFields({
        programs,
        statuses,
        cosponsors,
        caterers,
        rooms,
        audioVisual,
        eventtype,
        partners,
      });

      setIsLoading(false); // Set loading to false after data is fetched
    }

    fetchData();
  }, []);

  const sortedFieldsByName = Object.fromEntries(
    Object.entries(allFields).map(([key, value]) => [
      key,
      value
        .map((item) => [item.name, "#"])
        .sort((a, b) => a[0].localeCompare(b[0])),
    ])
  );

  // State to store form data
  const [formData, setFormData] = useState({
    eventName: "",
    program: "",
    eventOwner: "",
    cosponsor: "",
    status: "",
    eventtype: "",
    date: "",
    enddate: "",
    startTime: "",
    endTime: "",
    staffAccessStartTime: "",
    staffAccessEndTime: "",
    catering: "",
    room: "",
    audioVisual: "",
  });

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage></LoadingPage>
      </div>
    );
  }

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const submissionData = {
      ...formData,
    };

    try {
      const response = await submitNewEvent(submissionData);
      console.log(response);

      router.push(`/dashboard/events/${response.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex bg-no-repeat bg-cover bg-center h-full w-full bg-black-900">
      <div className="flex h-screen w-1/6 sticky top-0">
        <Sidebar></Sidebar>
      </div>

      <div className="flex flex-col w-5/6 p-10">
        <TitleBar>New Event</TitleBar>
        <form className="flex flex-col pt-4 gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Event Name (Text) */}
            <input
              type="text"
              placeholder="Event Name"
              className="input-field"
              value={formData.eventName}
              onChange={(e) => handleInputChange("eventName", e.target.value)}
            />

            {/* Event Owner (Autofill Text) */}
            <input
              type="text"
              placeholder="Event Owner"
              className="input-field"
              value={formData.eventOwner}
              onChange={(e) => handleInputChange("eventOwner", e.target.value)}
            />

            {/* Status (Dropdown) */}
            <Dropdown
              dropdown_name={"Status"}
              input_options={sortedFieldsByName.statuses}
              onSelect={(value, label) =>
                handleInputChange("status", value, label)
              }
            />

            {/* Cosponsor (Dropdown)
            <Dropdown
              dropdown_name={"Cosponsor"}
              input_options={sortedFieldsByName.cosponsor}
              onSelect={(value) => handleInputChange("cosponsor", value)}
            /> */}

            {/* Cosponsor (Input) */}

<input
              type="text"
              placeholder="Cosponsors"
              className="input-field"
              value={formData.eventOwner}
              onChange={(e) => handleInputChange("cosponsors", e.target.value)}
            />

            {/* Program (Dropdown) */}
            <Dropdown
              dropdown_name={"Program"}
              input_options={sortedFieldsByName.programs}
              onSelect={(value) => handleInputChange("program", value)}
            />

            <Dropdown
              dropdown_name={"Audience"}
              input_options={sortedFieldsByName.eventtype}
              onSelect={(value) => handleInputChange("eventtype", value)}
            />

            {/* Start Time (Time Select) */}
            <div>
              <h4 className="mb-2 text-white-100">Start Time</h4>
              <input
                type="time"
                className="input-field"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
              />

              {/* Start Date (Date Select) */}
              <input
                type="date"
                className="input-field"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>

            <div>
              <h4 className="mb-2 text-white-100">End Time</h4>
              {/* End Time (Time Select) */}
              <input
                type="time"
                className="input-field"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
              />
              {/* End Date (Date Select) */}
              <input
                type="date"
                className="input-field"
                value={formData.enddate}
                onChange={(e) => handleInputChange("enddate", e.target.value)}
              />
            </div>

            {/* Staff Access Start Time (Time Select) */}

            <div>
              <h4 className="mb-2 text-white-100">Staff Access Start Time</h4>
              <input
                type="time"
                className="input-field"
                value={formData.staffAccessStartTime}
                onChange={(e) =>
                  handleInputChange("staffAccessStartTime", e.target.value)
                }
              />
            </div>

            {/* Staff Access End Time (Time Select) */}

            <div>
              <h4 className="mb-2 text-white-100">Staff Access End Time</h4>
              <input
                type="time"
                className="input-field"
                value={formData.staffAccessEndTime}
                onChange={(e) =>
                  handleInputChange("staffAccessEndTime", e.target.value)
                }
              />
            </div>

            {/* Catering (Dropdown) */}
            <Dropdown
              dropdown_name={"Catering"}
              input_options={sortedFieldsByName.caterers}
              onSelect={(value) => handleInputChange("catering", value)}
            />

            {/* Room (Dropdown) */}
            <Dropdown
              dropdown_name={"Room"}
              input_options={sortedFieldsByName.rooms}
              onSelect={(value) => handleInputChange("room", value)}
            />

            {/* Audio Visual (Dropdown) */}
            <Dropdown
              dropdown_name={"Audio Visual"}
              input_options={sortedFieldsByName.audioVisual}
              onSelect={(value) => handleInputChange("audioVisual", value)}
            />

            {/* Partner (Dropdown) */}
            <Dropdown
              dropdown_name={"Partner Process"}
              input_options={sortedFieldsByName.partners}
              onSelect={(value) => handleInputChange("partners", value)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-primary px-3 py-2 text-white-100">
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
}
