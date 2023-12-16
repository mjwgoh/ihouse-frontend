import Link from "next/link";

export default function Dashboard_Event({ eventObj }) {
  const event_name = eventObj.eventName;
  const event_status = eventObj.status;
  const program = eventObj.program;
  const startTime = eventObj.startTime;
  const endTime = eventObj.endTime;
  const date = eventObj.date.split(" ").slice(0, 4).join(" ");
  const event_id = eventObj._id;

  let status_color;

  if (event_status === "Pending") {
    status_color = "bg-primary";
  } else if (event_status === "Approved") {
    status_color = "bg-accent";
  } else if (event_status === "Canceled") {
    status_color = "bg-secondary";
  }

  return (
    <Link href={`/dashboard/events/${event_id}`}>
      <div className="flex flex-col min-h-fit h-48 min-w-fit w-full border border-white-100 p-5 hover:bg-gray-900">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="event-title">{event_name}</div>
            <div className={`status ${status_color}`}>{event_status}</div>
          </div>
          <hr className="w-1/4"></hr>
          <div>Program: {program}</div>
        </div>
        <div className="flex flex-grow"></div>
        <div>
          <div className="text-sm">
            {startTime} - {endTime}
          </div>
          <div>{date}</div>
        </div>
      </div>
    </Link>
  );
}
