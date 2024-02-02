// import { useState, useEffect } from "react";
// import EventChecklistItem from "./admin_progress_item";
// import { retrieveEventChecklist, createEventChecklist, updateEventChecklist, deleteEventChecklist } from "@/pages/api/fields";

// export default function EventChecklist() {
//   const fields = "users";
//   const [allFields, setAllFields] = useState([]);
//   const [newEventChecklistItem, setnewEventChecklistItem] = useState({
//     title: "",
//     accessURL: "",
//     step: "",
//   });

//   const [editFieldID, setEditFieldID] = useState(null);
//   const [editedUser, setEditedUser] = useState({});

//   const fetchData = async () => {
//     const all_fields = await retrieveEventChecklist();
//     setAllFields(all_fields);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     await createEventChecklist(fields, {
//       ...newEventChecklistItem,
//       is_active: true,
//     });
//     setnewEventChecklistItem({ title: "", accessURL: "", step: "" });
//     fetchData();
//   };

//   const handleInputChange = (field, value) => {
//     if (editFieldID) {
//       setEditedUser((prev) => ({ ...prev, [field]: value }));
//     } else {
//       setnewEventChecklistItem((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleEditSubmit = async (event, id) => {
//     event.preventDefault();
//     await handleEdit(id);
//   };

//   const handleEdit = async (id) => {
//     await updateEventChecklist(id, { ...editedUser });
//     setEditFieldID(null);
//     fetchData();
//   };

//   const toggleEditMode = (field) => {
//     setEditFieldID(field._id);
//     setEditedUser({
//       title: field.title,
//       accessURL: field.accessURL,
//       step: field.step,
//     });
//   };

//   const handleDelete = async (id) => {
//     await deleteEventChecklist(id);
//     fetchData();
//   };
//   return (
//     <div className="flex flex-col w-full gap-3 text-black-900">
//       <form onSubmit={handleFormSubmit} className="flex w-full">
//         <input
//           type="accessURL"
//           placeholder="Enter Access URL"
//           value={newEventChecklistItem.accessURL}
//           required
//           onChange={(e) => handleInputChange("accessURL", e.target.value)}
//           className="flex w-1/3 p-4 border-r border-black-900"
//         />
//         <input
//           type="text"
//           placeholder="Title"
//           required
//           value={newEventChecklistItem.title}
//           onChange={(e) => handleInputChange("title", e.target.value)}
//           className="flex w-1/5 p-4 border-r border-black-900"
//         />
//         <input
//           type="text"
//           placeholder="Step"
//           required
//           value={newEventChecklistItem.step}
//           onChange={(e) => handleInputChange("step", e.target.value)}
//           className="flex w-1/5 p-4 border-r border-black-900"
//         />
//         <button type="submit" className="white-button">
//           Add User
//         </button>
//       </form>

//       {allFields.map((field) => (
//         <div key={field._id} className="flex flex-col gap-4 w-full h-full">
//           {editFieldID === field._id ? (
//             <form
//               onSubmit={(event) => handleEditSubmit(event, field._id)}
//               className="flex w-full bg-white-100 text-black-900"
//             >
//               {/* Input fields for editing existing user */}

//               <input
//                 type="text"
//                 value={editedUser.accessURL}
//                 onChange={(e) => handleInputChange("accessURL", e.target.value)}
//                 className="flex w-1/3 p-4 border-r border-black-900"
//               />

//               <input
//                 type="text"
//                 value={editedUser.title}
//                 onChange={(e) => handleInputChange("title", e.target.value)}
//                 className="flex w-1/4 p-4 border-r border-black-900"
//               />
//               <input
//                 type="text"
//                 value={editedUser.step}
//                 onChange={(e) => handleInputChange("step", e.target.value)}
//                 className="flex w-1/4 p-4 border-r border-black-900"
//               />
//               <button type="submit" className="border-r border-black-900 white-button">
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditFieldID(null)}
//                 className="white-button"
//               >
//                 Cancel
//               </button>
//             </form>
//           ) : (
//             <UserList
//               userDetails={{
//                 accessURL: field.accessURL,
//                 title: field.title,
//                 step: field.step,
//               }}
//               buttons={[
//                 {
//                   label: "Edit",
//                   action: () => toggleEditMode(field),
//                 },
//                 {
//                   label: "Delete",
//                   action: () => handleDelete(field._id),
//                 },
//               ]}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
