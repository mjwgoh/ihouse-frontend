import { useEffect, useState } from "react";
import { createStaffingReq, retrieveStaffingReq, updateStaffingReq } from "@/pages/api/event";

export default function StaffingItem({ event_id, email_id, field_name }) {
  const [staffed, setStaffed] = useState([]);
  const [req, setReq] = useState(0);
  const [updated, setUpdated] = useState(0);
  const [add_del, setAddDel] = useState("add");
  const [editStaffing, setEditStaffing] = useState(false);
  const [newReq, setNewReq] = useState(req);
  const [staffOthersPopout, setStaffOthersPopout] = useState(false);
  const [newStaff, setNewStaff] = useState("");


  useEffect(() => {
    async function fetchStaffingReq() {
      const response = await retrieveStaffingReq(event_id, field_name);
      setStaffed(response[field_name]);
      setReq(response[field_name + "_req"]);

      if (response[field_name] && response[field_name].includes(email_id)) {
        setAddDel("del");
      }
    }
    fetchStaffingReq();
  }, []);

  useEffect(() => {
    if (updated > 0) {
      updateStaffingReq(event_id, field_name, email_id, add_del);
    }
    setAddDel((prevAddDel) => (prevAddDel == "add" ? "del" : "add"));
  }, [updated]);

  return (
    <div>
      <div>
        <div className="flex bg-gray-800 text-white-100">
          <div className="p-4">
            {req} {field_name}
          </div>
          <div className="flex flex-grow bg-gray-800"></div>
          <button
            className={`flex p-4 bg-gray-900 hover:bg-black-900 ${
              editStaffing === false ? "" : "hidden"
            }`}
            onClick={() => setEditStaffing(true)}
          >
            Edit Staffing Requirements
          </button>
          <button className={`flex p-4 bg-gray-800 hover:bg-black-900 ${
              staffOthersPopout === false ? "" : "hidden"
            }`}
            onClick={() => setStaffOthersPopout(true)}
            >
            Staff Others
          </button>
          <button
            className="p-4 px-6 h-full bg-gray-700 text-white-100 hover:bg-black-900"
            onClick={() => {
              if (add_del == "add") {
                setStaffed((prevStaffing) =>
                  prevStaffing ? [...prevStaffing, email_id] : [email_id]
                );
                setUpdated((prevUpdated) => prevUpdated + 1);
              } else {
                console.log("removing");
                setStaffed((prevStaffing) =>
                  prevStaffing.filter((staff) => staff !== email_id)
                );
                setUpdated((prevUpdated) => prevUpdated + 1);
              }
            }}
          >
            Staff Myself
            {/* {add_del == "add" ? "Staff Myself" : "Unstaff Myself"} */}
          </button>
        </div>

        <div
          className={
            `flex bg-white-100 text-black-900 ${editStaffing === true ? "" : "hidden"}`
          }
        >
          <form className="flex flex-grow p-4">
            <input placeholder={req} onChange={(e) => setNewReq(e.target.value)}></input>
          </form>
          <button className="flex bg-gray-900 text-white-100 hover:bg-black-900 p-4"
          onClick={() => {
            setEditStaffing(false);
            setReq(newReq);
            createStaffingReq(event_id, field_name, newReq);
            }}>
            Save Staffing Requirements
          </button>
        </div>

        <div
          className={
            `flex bg-white-100 text-black-900 ${staffOthersPopout === true ? "" : "hidden"}`
          }
        >
          <form className="flex flex-grow p-4">
            <input placeholder={"only input one email address"} onChange={(e) => setNewStaff(e.target.value)}></input>
          </form>
          <button className="flex bg-gray-900 text-white-100 hover:bg-black-900 p-4"
          onClick={() => {
            setStaffOthersPopout(false);
            updateStaffingReq(event_id, field_name, newStaff, "add");
            }}>
            Add New Staff
          </button>
        </div>
        <div className="flex bg-gray-100 text-black-900 p-2 px-4 gap-2 text-sm">
          {staffed &&
            staffed.map((staff) => {
              return <div key={staff}>{staff}</div>;
            })}
        </div>
      </div>
    </div>
  );
}
