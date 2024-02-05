import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";
import Dropdown from "@/components/dropdown";
import { retrieveEvent, updateEvent } from "@/pages/api/event";
import { retrieveFields } from "@/pages/api/fields";
import LoadingPage from "@/components/loading";
import ProcessChecklist from "@/components/processChecklist";
import { useRouter } from "next/router";
import ProgressItem from "@/components/progress_item";
import { useSession } from "next-auth/react";
import ProgressChecklist from "@/components/progress_checklist";
import StaffingChecklist from "@/components/staffing_checklist";

const inter = Inter({ subsets: ["latin"] });

export default function Events() {
  const { data: session, status } = useSession();

  const [allFields, setAllFields] = useState({
    programs: [],
    statuses: [],
    cosponsors: [],
    caterers: [],
    rooms: [],
    audioVisual: [],
    eventtype: [],
  });

  const [partners, setPartners] = useState([]);

  // Retrieve event_id from the URL
  const router = useRouter();
  const { id } = router.query;

  // Set loading state

  const [isLoading, setIsLoading] = useState(true);

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
    partners: "",
  });

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      // retrieve field data
      const programs = await retrieveFields("programs");
      const statuses = await retrieveFields("statuses");
      const cosponsors = await retrieveFields("cosponsors");
      const caterers = await retrieveFields("caterers");
      const rooms = await retrieveFields("rooms");
      const audioVisual = await retrieveFields("av");
      const eventtype = await retrieveFields("eventtype");
      const partners = await retrieveFields("partners");

      // Defines the dropdown field options
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

      // retrieve event data
      const fetchedEvent = await retrieveEvent(id);

      if (fetchedEvent) {
        // Set form data
        setFormData({
          eventName: fetchedEvent.eventName,
          program: fetchedEvent.program,
          eventOwner: fetchedEvent.eventOwner,
          cosponsor: fetchedEvent.cosponsor,
          status: fetchedEvent.status,
          eventtype: fetchedEvent.eventtype,
          date: new Date(fetchedEvent.date).toISOString().split("T")[0],
          enddate: new Date(fetchedEvent.enddate).toISOString().split("T")[0],
          startTime: fetchedEvent.startTime,
          endTime: fetchedEvent.endTime,
          staffAccessStartTime: fetchedEvent.staffAccessStartTime,
          staffAccessEndTime: fetchedEvent.staffAccessEndTime,
          catering: fetchedEvent.catering,
          room: fetchedEvent.room,
          audioVisual: fetchedEvent.audioVisual,
          partners: fetchedEvent.partners,
        });
      }

      // // Correctly initialize checkbox states
      // const initCheckboxState = (items) =>
      //   items.reduce((acc, item) => {
      //     acc[item.name] = false;
      //     return acc;
      //   }, {});

      // setCheckboxValues({
      //   partners: initCheckboxState(partners),
      //   custom_checklist: initCheckboxState(custom_checklist),
      // });

      setIsLoading(false); // Set loading to false after data is fetched
    }

    fetchData();
  }, [id]);

  const sortedFieldsByName = Object.fromEntries(
    Object.entries(allFields).map(([key, value]) => [
      key,
      value
        .map((item) => [item.name, "#"])
        .sort((a, b) => a[0].localeCompare(b[0])),
    ])
  );

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
      const response = await updateEvent(id, submissionData);
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

        <div className="flex pt-10 text-white-100">
          <h1>Event Details</h1>
        </div>

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
              activeValue={formData.status}
              input_options={sortedFieldsByName.statuses}
              onSelect={(value, label) =>
                handleInputChange("status", value, label)
              }
            />

            {/* Cosponsor (Dropdown) */}
            <Dropdown
              dropdown_name={"Cosponsor"}
              activeValue={formData.cosponsor}
              input_options={sortedFieldsByName.cosponsors}
              onSelect={(value) => handleInputChange("cosponsor", value)}
            />

            {/* Program (Dropdown) */}
            <Dropdown
              dropdown_name={"Program"}
              activeValue={formData.program}
              input_options={sortedFieldsByName.programs}
              onSelect={(value) => handleInputChange("program", value)}
            />

            <Dropdown
              dropdown_name={"Event Type"}
              activeValue={formData.eventtype}
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
              activeValue={formData.catering}
              input_options={sortedFieldsByName.caterers}
              onSelect={(value) => handleInputChange("catering", value)}
            />

            {/* Room (Dropdown) */}
            <Dropdown
              dropdown_name={"Room"}
              activeValue={formData.room}
              input_options={sortedFieldsByName.rooms}
              onSelect={(value) => handleInputChange("room", value)}
            />

            {/* Audio Visual (Dropdown) */}
            <Dropdown
              dropdown_name={"Audio Visual"}
              activeValue={formData.audioVisual}
              input_options={sortedFieldsByName.audioVisual}
              onSelect={(value) => handleInputChange("audioVisual", value)}
            />

            {/* Partner (Dropdown) */}
            <Dropdown
              dropdown_name={"Partner Process"}
              input_options={sortedFieldsByName.partners}
              activeValue={formData.partners}
              onSelect={(value) => handleInputChange("partners", value)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-primary px-3 py-2 text-white-100">
            Update Event
          </button>

          <div className="flex justify-center text-sm">
            Be aware that event information will be saved only when you press
            the Update Event button. The progress checklist and alterations in
            staffing are updated in real-time.
          </div>
        </form>
{/* 
        <div className="flex p-3 pt-10">
          <h1>Process Checklist</h1>
        </div>

        <ProcessChecklist list_options={partners}></ProcessChecklist> */}

        <div className="flex p-3 pt-10 text-white-100">
          <h1>Progress Checklist</h1>
        </div>

        <ProgressChecklist event_id={id[0]} email_id={session.user.email} />

        <div className="flex p-3 pt-10 text-white-100">
          <h1>Staffing Requirements</h1>
        </div>

        {/* Create Staffing Requirements Module */}

        <StaffingChecklist
          event_id={id[0]}
          email_id={session.user.email}
        ></StaffingChecklist>

        <div></div>
      </div>
    </main>
  );
}
