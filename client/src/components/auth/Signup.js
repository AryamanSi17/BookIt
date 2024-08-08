import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { institutions, InstitutionList } from "../Institutions";

const Signup = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    password: "",
    cpassword: "",
    adminKey: "",
    // Booking related fields
    eventName: "",
    eventDateType: "",
    eventDate: "",
    eventStartDate: "",
    eventEndDate: "",
    startTime: "",
    endTime: "",
    organizingClub: "",
    altNumber: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const PostData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const {
      name,
      email,
      phone,
      userType,
      adminKey,
      password,
      cpassword,
      // Booking fields
      eventName,
      eventDateType,
      eventDate,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      organizingClub,
      altNumber,
    } = user;

    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        {
          name,
          email,
          phone,
          userType,
          adminKey,
          password,
          cpassword,
          eventName,
          eventDateType,
          eventDate,
          eventStartDate,
          eventEndDate,
          startTime,
          endTime,
          organizingClub,
          altNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      toast.success("Sign Up Successful!");

      navigate("/login");
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        setIsLoading(false);
        const data = error.response.data;
        setAuthStatus(data.error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="text-gray-600 body-font my-10 min-h-screen flex items-center justify-center bg-white">
          <div className="lg:w-2/6 md:w-1/2 my-10 bg-white shadow-2xl shadow-blue-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0">
            <form method="POST">
              <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Sign <span className="text-yellow-600">Up</span>
              </h3>
              <h1>{process.env.REACT_APP_SERVER_URL}</h1>

              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={user.name}
                  onChange={handleInputs}
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={user.email}
                  onChange={handleInputs}
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="phone"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  value={user.phone}
                  onChange={handleInputs}
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="userType"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Your Role
                </label>

                <select
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  id="userType"
                  name="userType"
                  value={user.userType}
                  onChange={handleInputs}
                >
                  <option value="">Select</option>
                  <option value="faculty">Faculty</option>
                  {process.env.REACT_APP_HOD_FEATURE === "true" && (
                    <option value="hod">HOD</option>
                  )}
                  {process.env.REACT_APP_ADMIN_SIGN_UP === "true" && (
                    <option value="admin">Admin</option>
                  )}
                </select>
              </div>

              {user.userType === "admin" && (
                <div className="relative mb-4">
                  <label
                    htmlFor="adminKey"
                    className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  >
                    Admin Key
                  </label>
                  <input
                    type="text"
                    required
                    value={user.adminKey}
                    onChange={handleInputs}
                    id="adminKey"
                    name="adminKey"
                    placeholder="Admin Key"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              )}

              {user.userType === "faculty" && (
                <>
                  <div className="relative mb-4">
                    <label
                      htmlFor="eventName"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                    >
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={user.eventName}
                      onChange={handleInputs}
                      id="eventName"
                      name="eventName"
                      placeholder="Event Name"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  <div className="relative mb-4">
                    <label
                      htmlFor="eventDateType"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                    >
                      Event Date Type
                    </label>
                    <select
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      id="eventDateType"
                      name="eventDateType"
                    value={user.eventDateType}
                    onChange={handleInputs}
                    >
                      <option value="">Select</option>
                      <option value="half">Half Day</option>
                      <option value="full">Full Day</option>
                      <option value="multiple">Multiple Days</option>
                    </select>
                  </div>

                  {user.eventDateType === "multiple" && (
                    <>
                      <div className="relative mb-4">
                        <label
                          htmlFor="eventStartDate"
                          className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                        >
                          Event Start Date
                        </label>
                        <input
                          type="date"
                          value={user.eventStartDate}
                          onChange={handleInputs}
                          id="eventStartDate"
                          name="eventStartDate"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>

                      <div className="relative mb-4">
                        <label
                          htmlFor="eventEndDate"
                          className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                        >
                          Event End Date
                        </label>
                        <input
                          type="date"
                          value={user.eventEndDate}
                          onChange={handleInputs}
                          id="eventEndDate"
                          name="eventEndDate"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </>
                  )}

                  {(user.eventDateType === "full" || user.eventDateType === "half") && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="eventDate"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      >
                        Event Date
                      </label>
                      <input
                        type="date"
                        value={user.eventDate}
                        onChange={handleInputs}
                        id="eventDate"
                        name="eventDate"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  )}

                  {user.eventDateType === "half" && (
                    <>
                      <div className="relative mb-4">
                        <label
                          htmlFor="startTime"
                          className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                        >
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={user.startTime}
                          onChange={handleInputs}
                          id="startTime"
                          name="startTime"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>

                      <div className="relative mb-4">
                        <label
                          htmlFor="endTime"
                          className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                        >
                          End Time
                        </label>
                        <input
                          type="time"
                          value={user.endTime}
                          onChange={handleInputs}
                          id="endTime"
                          name="endTime"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </>
                  )}

                  <div className="relative mb-4">
                    <label
                      htmlFor="organizingClub"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                    >
                      Organizing Club
                    </label>
                    <input
                      type="text"
                      value={user.organizingClub}
                      onChange={handleInputs}
                      id="organizingClub"
                      name="organizingClub"
                      placeholder="Organizing Club"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  <div className="relative mb-4">
                    <label
                      htmlFor="altNumber"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                    >
                      Alternate Number
                    </label>
                    <input
                      type="tel"
                      value={user.altNumber}
                      onChange={handleInputs}
                      id="altNumber"
                      name="altNumber"
                      placeholder="Alternate Number"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </>
              )}

              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Password
                </label>
                <input
                  required
                  value={user.password}
                  onChange={handleInputs}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="cpassword"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Confirm Password
                </label>
                <input
                  required
                  value={user.cpassword}
                  onChange={handleInputs}
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="my-4">
                <p className="text-s text-red-600 font-bold">{authStatus}</p>
              </div>
              <div className="mx-auto w-fit">
                <div className="mx-auto">
                  <button
                    type="submit"
                    onClick={PostData}
                    className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold hover:bg-indigo-800 rounded text-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-m">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Signup;
