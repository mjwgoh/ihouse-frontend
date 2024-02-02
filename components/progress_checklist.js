import { useState, useEffect } from "react";
import ProgressItem from "./progress_item";
import { retrieveEventChecklist } from "@/pages/api/fields";

export default function ProgressChecklist(props) {

    const {event_id, email_id} = props;
    const [checklist, setChecklist] = useState([]);

    useEffect(() => {

        async function fetchChecklist() {
            const checklist = await retrieveEventChecklist();
            setChecklist(checklist);
        }
    
        fetchChecklist();
    
    }, []);

    return (
        <div>
            {checklist ? (checklist.map((item) => (
                <ProgressItem
                    listname={item.listname}
                    access_url={item.access_url}
                    key={item.step}
                    event_id={event_id}
                    email_id={email_id}
                    step={item.step}
                />
            ))) : (
                <div className="flex pt-5">
                    No Checklist Items Found
                </div>
            )}
        </div>
    )

}