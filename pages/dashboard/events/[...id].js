import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";
import Dropdown from "@/components/dropdown";
import { submitNewEvent } from "@/pages/api/event";
import { retrieveFields, retrieveEventDetails } from "@/pages/api/fields";
import LoadingPage from "@/components/loading";
import CheckboxList from "@/components/checkbox";

export default function Event() {
  const [allFields, setAllFields] = useState({
    programs: [],
    statuses: [],
    cosponsors: [],
    caterers: [],
    rooms: [],
    audioVisual: [],
    eventtype: [],
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allCheckboxes, setAllCheckboxes] = useState({
    partners: [],
    custom_checklist: [],
  });

  const [checkboxValues, setCheckboxValues] = useState({
    partners: {},
    custom_checklist: {},
  });

  const [formData, setFormData] = useState({
    eventName: "",
    program: "",
    eventOwner: "",
    cosponsor: "",
    status: "",
    eventtype: "",
    date: "",
    startTime: "",
    endTime: "",
    staffAccessStartTime: "",
    staffAccessEndTime: "",
    catering: "",
    room: "",
    audioVisual: "",
  });

  useEffect(() => {
    async function fetchData() {
      const fieldsData = await Promise.all([
        retrieveFields("programs"),
        retrieveFields("statuses"),
        retrieveFields("cosponsors"),
        retrieveFields("caterers"),
        retrieveFields("rooms"),
        retrieveFields("av"),
        retrieveFields("eventtype"),
        retrieveFields("partners"),
        retrieveFields("custom_checklist"),
      ]);

      setAllFields({
        programs: fieldsData[0],
        statuses: fieldsData[1],
        cosponsors: fieldsData[2],
        caterers: fieldsData[3],
        rooms: fieldsData[4],
        audioVisual: fieldsData[5],
        eventtype: fieldsData[6],
      });

      setAllCheckboxes({
        partners: fieldsData[7],
        custom_checklist: fieldsData[8],
      });

      if (eventId) {
        try {
          const eventData = await retrieveEventDetails(eventId);
          setFormData(eventData);

          setCheckboxValues({
            partners: initCheckboxStateWithValues(fieldsData[7], eventData.partners),
            custom_checklist: initCheckboxStateWithValues(fieldsData[8], eventData.customChecklist),
          });
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      } else {
        setCheckboxValues({
          partners: initCheckboxState(fieldsData[7]),
          custom_checklist: initCheckboxState(fieldsData[8]),
        });
      }

      setIsLoading(false);
    }

    fetchData();
  }, [eventId]);

  const initCheckboxState = (items) =>
    items.reduce((acc, item) => {
      acc[item.name] = false;
      return acc;
    }, {});

  const initCheckboxStateWithValues = (items, existingValues) =>
    items.reduce((acc, item) => {
      acc[item.name] = existingValues.includes(item.name);
      return acc;
    }, {});

  const handleCheckboxChange = (checkboxGroup, checkboxName) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxGroup]: {
        ...prevValues[checkboxGroup],
        [checkboxName]: !prevValues[checkboxGroup][checkboxName],
      },
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedCheckboxValues = Object.keys(checkboxValues).reduce(
      (acc, group) => {
        acc[group] = Object.entries(checkboxValues[group])
          .filter(([_, value]) => value)
          .map(([key]) => key);
        return acc;
      },
      {}
    );

    const submissionData = {
      ...formData,
      checkboxValues: formattedCheckboxValues,
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
        <TitleBar>Edit Event</TitleBar>
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

            {/* Date (Date Select) */}
            <input
              type="date"
              className="input-field"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
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

            {/* Cosponsor (Dropdown) */}
            <Dropdown
              dropdown_name={"Cosponsor"}
              input_options={sortedFieldsByName.cosponsors}
              onSelect={(value) => handleInputChange("cosponsor", value)}
            />

            {/* Program (Dropdown) */}
            <Dropdown
              dropdown_name={"Program"}
              input_options={sortedFieldsByName.programs}
              onSelect={(value) => handleInputChange("program", value)}
            />

            {/* Start Time (Time Select) */}
            <div>
              <h4 className="mb-2">Start Time</h4>
              <input
                type="time"
                className="input-field"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
              />
            </div>

            <div>
              <h4 className="mb-2">End Time</h4>
              {/* End Time (Time Select) */}
              <input
                type="time"
                className="input-field"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
              />
            </div>

            {/* Staff Access Start Time (Time Select) */}

            <div>
              <h4 className="mb-2">Staff Access Start Time</h4>
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
              <h4 className="mb-2">Staff Access End Time</h4>
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
            <Dropdown
              dropdown_name={"Event Type"}
              input_options={sortedFieldsByName.eventtype}
              onSelect={(value) => handleInputChange("eventtype", value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CheckboxList
              list={sortedCheckboxesByName.partners}
              checkboxValues={checkboxValues.partners}
              onInputChange={(checkboxName) =>
                handleCheckboxChange("partners", checkboxName)
              }
            ></CheckboxList>
            <CheckboxList
              list={sortedCheckboxesByName.custom_checklist}
              checkboxValues={checkboxValues.custom_checklist}
              onInputChange={(checkboxName) =>
                handleCheckboxChange("custom_checklist", checkboxName)
              }
            ></CheckboxList>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-primary px-3 py-2 text-white">
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
}
