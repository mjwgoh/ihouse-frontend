import { Inter } from "next/font/google";
import Checklist from "@/components/checklist";
import { useState, useEffect } from "react";
import {
  retrieveFields,
  submitFields,
  editFields,
  deleteFields,
} from "/pages/api/fields";

const inter = Inter({ subsets: ["latin"] });

export default function FieldList(props) {
  const { listname, fields } = props;

  const [allFields, setAllFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [editedFieldName, setEditedFieldName] = useState("");
  const [editFieldID, setEditFieldID] = useState(null);

  const fetchData = async () => {
    const all_fields = await retrieveFields(fields);
    setAllFields(all_fields);
  };

  // Fetch programs on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const saveField = async () => {
    if (newFieldName) {
      await submitFields(fields, {
        name: newFieldName,
        is_active: true,
      });
      setNewFieldName(""); // Reset the input field
      fetchData(); // Refresh the list of programs
    }
  };

  const handleEdit = async (fields, id, newName) => {
    // Submit the edit
    await editFields(fields, id, { name: newName });
    setEditFieldID(null); // Exit edit mode
    fetchData(); // Refresh data
  };

  const toggleEditMode = (id, currentName) => {
    setEditFieldID(id);
    setEditedFieldName(currentName);
  };

  const handleDelete = async (fields, id) => {
    await deleteFields(fields, id);
    fetchData();
  };

  return (
    <div className="flex flex-col w-full border p-10 gap-3 text-white-100 border-white-100">
      <div>
        <h1>{listname}</h1>
      </div>

      {allFields &&
        allFields
          .map((program) => (
            <div
              key={program._id}
              className="flex flex-col gap-4 w-full h-full"
            >
              {editFieldID === program._id ? (
                <div className="flex w-full bg-white-100 text-black-900">
                  <input
                    className="flex-grow p-4"
                    type="text"
                    value={editedFieldName}
                    onChange={(e) => setEditedFieldName(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleEdit(fields, program._id, editedFieldName)
                    }
                    className="border-x border-black-900 white-button"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditFieldID(null)}
                    className="white-button"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <Checklist
                  header={program.name}
                  buttons={[
                    {
                      label: "Edit",
                      action: () => toggleEditMode(program._id, program.name),
                    },
                    {
                      label: "Delete",
                      action: () => handleDelete(fields, program._id),
                    },
                  ]}
                />
              )}
            </div>
          ))}
      {
        <div className="flex">
          <input
            type="text"
            placeholder={`${listname.slice(0, -1)} Name`}
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            className="flex text-black-900 border-r border-black-900 outline-none p-3 flex-grow"
          />
          <button onClick={() => saveField()} className="white-button">
            Add Option
          </button>
        </div>
      }
    </div>
  );
}
