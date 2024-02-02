import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TitleBar from "@/components/titlebar";
import FieldList from "@/components/field_options";
import EventChecklist from "@/components/admin_progress";

const inter = Inter({ subsets: ["latin"] });

export default function Admin() {
  
  return (
    <main className="flex bg-no-repeat bg-cover bg-center h-full w-full bg-black-900">
      <div className="flex h-screen w-1/6 sticky top-0">
        <Sidebar />
      </div>

      <div className="flex flex-col w-5/6 p-10 gap-6">
        <TitleBar>Admin</TitleBar>
        <FieldList listname="Programs" fields="programs"></FieldList>
        <FieldList listname="Cosponsors" fields="cosponsors"></FieldList>
        <FieldList listname="Caterers" fields="caterers"></FieldList>
        <FieldList listname="Rooms" fields="rooms"></FieldList>
        <FieldList listname="AV Providers" fields="av"></FieldList>
        <FieldList listname="Status Options" fields="statuses"></FieldList>
        <FieldList listname="Event Type Options" fields="eventtype"></FieldList>
        <FieldList listname="Partner Checklist Options" fields="partners"></FieldList>
        <FieldList listname="Custom Checklist Options" fields="custom_checklist"></FieldList>
        {/* <EventChecklist listname="Event Checklist Items" fields="event_checklist" /> */}
      </div>
    </main>
  );
}
