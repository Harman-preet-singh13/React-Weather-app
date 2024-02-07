import React, { useState, useEffect } from "react";
import {
  ref,
  onValue,
  remove,
  push,
  set,
  serverTimestamp,
} from "firebase/database";
import { database } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import Modal from "react-modal";

export default function AdminTable() {
  const { user } = UserAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (user) {
      const usersRef = ref(database, `active-users`);

      const unsubscribe = onValue(usersRef, (snapshot) => {
        try {
          const userData = snapshot.val();
          const userArray = userData ? Object.values(userData) : [];
          setUsers(userArray);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching users:", error);
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const convertTimestampToDate = (t) => {
    const date = new Date(t);

    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return formattedDate;
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (user) {
      const userRef = ref(database, `active-users`);
      const newUserRef = push(userRef);

      await set(newUserRef, {
        id: newUserRef.key,
        displayName: username,
        addedDate: serverTimestamp(),
        isActive: false,
      });
    }

    setUsername(" ")
    closeModal()
  };

  const deleteUser = async (id) => {
    if (user) {
      const userRef = ref(database, `active-users/${id}`);

      try {
        await remove(userRef);

        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error removing user:", error);
      }
    }
  };

  console.log(users);

  return (
    <div className="max-w-[1024px] mt-2 mx-auto bg-white h-[90vh]">
      <h1 className="px-5 text-2xl font-semibold font-mono">Admin Page</h1>
      <div className="px-5 text-right">
        <button
          onClick={openModal}
          className="text-lg font-semibold px-2 py-1 border-2 border-red-400 rounded-md hover:text-white hover:bg-red-400"
        >
          Add User
        </button>

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          <div className="w-[500px]">
            <div className="relative w-full min-w-[200px] ">
              <input
                className=" peer w-full border-slate-500 h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Username
              </label>

              <div className="text-center">
                <button
                type="submit"
                onClick={addUser}
                className="my-2 font-semibold px-2 py-1 border border-blue-400 rounded-md hover:text-white hover:bg-blue-400">
                  Add user
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="mx-4 my-5 text-center">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Added Date</th>
              <th>IsActive</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading User...</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.displayName}</td>
                  <td>{convertTimestampToDate(user.addedDate)}</td>
                  <td>{user.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
