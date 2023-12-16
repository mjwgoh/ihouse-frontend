import { useState, useEffect } from "react";
import UserList from "./userlist";
import {
  retrieveFields,
  submitFields,
  editFields,
  deleteFields,
} from "/pages/api/fields";

export default function UsersList() {
  const fields = "users";
  const [allFields, setAllFields] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    privileges: "user",
    created_date: new Date(),
  });
  const [editFieldID, setEditFieldID] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const fetchData = async () => {
    const all_fields = await retrieveFields(fields);
    setAllFields(all_fields);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await submitFields(fields, {
      ...newUser,
      is_active: true,
    });
    setNewUser({ firstName: "", lastName: "", email: "", privileges: "user" });
    fetchData();
  };

  const handleInputChange = (field, value) => {
    if (editFieldID) {
      setEditedUser((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditSubmit = async (event, id) => {
    event.preventDefault();
    await handleEdit(id);
  };

  const handleEdit = async (id) => {
    await editFields(fields, id, { ...editedUser });
    setEditFieldID(null);
    fetchData();
  };

  const toggleEditMode = (field) => {
    setEditFieldID(field._id);
    setEditedUser({
      firstName: field.firstName,
      lastName: field.lastName,
      email: field.email,
      privileges: field.privileges,
    });
  };

  const handleDelete = async (id) => {
    await deleteFields(fields, id);
    fetchData();
  };
  return (
    <div className="flex flex-col w-full gap-3 text-black-900">
      <form onSubmit={handleFormSubmit} className="flex w-full">
        <input
          type="email"
          placeholder="Enter User Email Address"
          value={newUser.email}
          required
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="flex w-1/3 p-4 border-r border-black-900"
        />
        <input
          type="text"
          placeholder="First Name"
          required
          value={newUser.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          className="flex w-1/5 p-4 border-r border-black-900"
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={newUser.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          className="flex w-1/5 p-4 border-r border-black-900"
        />
        <div className="flex items-center bg-white-100 w-1/5 justify-evenly border-r border-black-900">
          <label className="flex items-center gap-4">
            <input
              type="radio"
              name="privileges"
              value="user"
              checked={newUser.privileges === "user"}
              onChange={(e) => handleInputChange("privileges", e.target.value)}
            />
            User
          </label>
          <label className="flex items-center gap-4">
            <input
              type="radio"
              name="privileges"
              value="admin"
              checked={newUser.privileges === "admin"}
              onChange={(e) => handleInputChange("privileges", e.target.value)}
            />
            Admin
          </label>
        </div>
        <button type="submit" className="white-button">
          Add User
        </button>
      </form>

      {allFields.map((field) => (
        <div key={field._id} className="flex flex-col gap-4 w-full h-full">
          {editFieldID === field._id ? (
            <form
              onSubmit={(event) => handleEditSubmit(event, field._id)}
              className="flex w-full bg-white-100 text-black-900"
            >
              {/* Input fields for editing existing user */}

              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="flex w-1/3 p-4 border-r border-black-900"
              />

              <input
                type="text"
                value={editedUser.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="flex w-1/4 p-4 border-r border-black-900"
              />
              <input
                type="text"
                value={editedUser.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="flex w-1/4 p-4 border-r border-black-900"
              />
              {/* Radio buttons for privileges */}
              <div className="flex w-1/5 justify-evenly items-center border-r border-black-900">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="privileges"
                    value="user"
                    checked={editedUser.privileges === "user"}
                    onChange={(e) =>
                      handleInputChange("privileges", e.target.value)
                    }
                  />
                  User
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="privileges"
                    value="admin"
                    checked={editedUser.privileges === "admin"}
                    onChange={(e) =>
                      handleInputChange("privileges", e.target.value)
                    }
                  />
                  Admin
                </label>
              </div>
              <button type="submit" className="border-r border-black-900 white-button">
                Save
              </button>
              <button
                onClick={() => setEditFieldID(null)}
                className="white-button"
              >
                Cancel
              </button>
            </form>
          ) : (
            <UserList
              userDetails={{
                email: field.email,
                firstName: field.firstName,
                lastName: field.lastName,
                privileges: field.privileges,
              }}
              buttons={[
                {
                  label: "Edit",
                  action: () => toggleEditMode(field),
                },
                {
                  label: "Delete",
                  action: () => handleDelete(field._id),
                },
              ]}
            />
          )}
        </div>
      ))}
    </div>
  );
}
