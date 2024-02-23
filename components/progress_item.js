import { useState, useEffect } from "react";
import { updateStaffing, retrieveStaffing } from "../pages/api/event";

export default function ProgressItem(props) {
  const {
    listname,
    access_url = "#",
    email_id = "#",
    event_id = "",
    step = "",
  } = props;
  const [staffing, setStaffing] = useState([]);
  const [complete, setComplete] = useState(0);
  const [updated, setUpdated] = useState(0);
  const [add_del, setAddDel] = useState("add");
  const [completion, setCompletion] = useState("add");
  const [completeColor, setCompleteColor] = useState("bg-gray-800 text-white-100");

  // useEffect(() => {
  //   {
  //     /* Upon update of complete, send update to server */
  //   }
  // }, [complete]);

  useEffect(() => {
    {
      /* Retrieve staffing list from server */
    }

    async function fetchStaffing() {
      const response = await retrieveStaffing(event_id, step);
      const staffList = Object.values(response)[0];
      setStaffing(staffList);

      // if (staffList.includes(email_id)) {
      //   setAddDel("del");
      //   console.log("del");
      // }

      if (staffList.includes("complete")) {
        setCompleteColor("bg-green-800 text-white-100");
        setCompletion("del");
      }


    }

    fetchStaffing();

  }, []);

  useEffect(() => {
    {
      /* Upon update of staffing list, send update to server */
    }

    if (updated > 0) {
      updateStaffing(event_id, email_id, step, add_del);
    }

    setAddDel(prevAddDel => prevAddDel == "add" ? "del" : "add");

  }, [updated]);

  useEffect(() => {
    {
      /* Upon update of staffing list, send update to server */
    }

    if (complete > 0) {
      updateStaffing(event_id, "complete", step, completion);
    }

    setCompletion(completion => completion == "add" ? "del" : "add");

  }, [complete]);

  return (
    <div
      className={`flex flex-col ${
        completeColor
      }`}
    >
      <div className="flex">
        <div className="p-4">{listname}</div>
        <div className="flex flex-grow"></div>
        <div className="text-left">
          {/* <a href={access_url} target="_blank" rel="noopener noreferrer">
            <button className="p-4 px-6 h-full bg-gray-700 text-white-100 hover:bg-black-900">
              Access
            </button>
          </a> */}
          <button
            className="p-4 px-6 h-full bg-gray-700 text-white-100 hover:bg-black-900"
            onClick={() => {

              if (add_del == "add") {
                setStaffing((prevStaffing) =>
                prevStaffing ? [...prevStaffing, email_id] : [email_id]
              );
              setUpdated(prevUpdated => prevUpdated + 1);
              
              } else {
                setStaffing((prevStaffing) =>
                prevStaffing.filter((staff) => staff !== email_id)
              );
              setUpdated(prevUpdated => prevUpdated + 1);
              
            }
          }}
          >
            Staff Myself
            {/* {add_del == "add" ? "Staff Myself" : "Unstaff Myself"} */}
          </button> 

          <button
            className="p-4 px-6 h-full bg-gray-700 text-white-100 hover:bg-black-900"
            onClick={() => {

              if (completion == "add") {
                setStaffing((prevStaffing) =>
                prevStaffing ? [...prevStaffing, "complete"] : ["complete"]
              );
              setComplete(prevCompleted => prevCompleted + 1);
              
              } else {
                setStaffing((prevStaffing) =>
                prevStaffing.filter((staff) => staff !== "complete")
              );
              setComplete(prevCompleted => prevCompleted + 1);
              
            }
          }}
          >
            Mark Complete
            {/* {add_del == "add" ? "Staff Myself" : "Unstaff Myself"} */}
          </button> 



          {/* <button
            className="p-4 px-6 h-full bg-gray-700 text-white-100 hover:bg-black-900"
            onClick={() => setComplete(!complete)}
          >
            Mark Complete
          </button> */}
        </div>
      </div>
      <div className="flex bg-gray-100 text-black-900 p-2 px-4 gap-2 text-sm">
        {staffing &&
          staffing.map((staff, index) => <div key={index}>{staff},</div>)}
      </div>
    </div>
  );
}
