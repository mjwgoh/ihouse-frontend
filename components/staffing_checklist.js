import { useState, useEffect } from "react";
import StaffingItem from "./staffing_item";
import { retrieveFields } from "@/pages/api/fields";

export default function StaffingChecklist({event_id, email_id}) {
  const [staffingFields, setStaffingFields] = useState([]);

  useEffect(() => {
    retrieveFields("staffing").then((data) => {
      setStaffingFields(data);
    });
  }, []);

  return (
    <div>
      {staffingFields && staffingFields.map((field) => {
        return(
        <div key={field.id}>
          <StaffingItem
            event_id={event_id}
            email_id={email_id}
            field_name={field.name}
          />
        </div>
      )})}
    </div>
  );
}
