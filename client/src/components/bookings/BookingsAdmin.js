import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom"
import axios from 'axios';
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns"
// import BookingForm from "./BookingForm";
import { ApprovedByAdmin,ApprovedByHod,RejectedByAdmin} from "../Steps"
const BookingsAdmin = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("Approved By HOD");
  const [emailVerified, setEmailVerified] = useState(false);



  const userContact = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getdata`, {
        withCredentials: true, // include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data);

      if(data.emailVerified){
        setEmailVerified(true)
      }



      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
   
      // console.log(error);
      
    }
  };

  useEffect(() => {
    userContact();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBookingData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bookingsAdmin`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log(data);

      const sortedBookingData = data.bookings.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      setBookingData(sortedBookingData);

      // setBookingData(data.bookings);
      setIsLoading(false);



      // if (response.status === 401) {
      //   toast.warn("Unauthrized Access!")
      //   navigate("/login");
      //   // throw new Error(response.error);
      // }

      // if (response.status === 401) {
      //   toast.warn("Unauthrized Access!")
      //   navigate("/login");
      // } else 


      if (response.status !== 200) {

        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: 'Unauthrized'
      })
        navigate("/login");
      }
      // navigate("/login");
    }
  };






  useEffect(() => {

    getBookingData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // navigate(`/bookingForm/${hallId}/${hallName}`)


  const updateBooking = async (bookingId, isApproved) => {
    setIsLoading(true);

    console.log(isApproved);
    try {
      const response = await axios.put(`http://localhost:9002/bookings/${bookingId}`, {
        isApproved: isApproved
      }, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log(data);


      // setBookingData(data.bookings);
      
      getBookingData();
      // setIsLoading(false);
      toast.success(`Request ${isApproved} Successfull!`)

      if (response.status !== 200) {

        throw new Error(response.error);
      }
    } catch (error) {

      console.log(error);
      // navigate("/login");
    }
  };

  const deleteBooking = async (bookingId) => {
    // e.preventDefault();


    try {
      const response = await axios.delete (
        `http://localhost:9002/bookings/${bookingId}`,

        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (!data) {
        toast.error("Request not send!")
        // console.log("Message not send");
      } else {
        getBookingData();
        toast.success("Request send Successfull!")
        // alert("Message send");
        navigate("/")
        // setBookingData({ ...bookingData });
      }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        const data = error.response.data;
        console.log(data.error);
        // window.alert(data.error);
      } else {
        console.error(error);
      }
      // console.log(error);
    }
  };


  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const filteredBookings = Object.values(bookingData).filter((bookingData) => {
    if (filterValue === "Approved By HOD") {
      return bookingData.isApproved === "Approved By HOD";
    } else if (filterValue === "Approved By Admin") {
      return bookingData.isApproved === "Approved By Admin";
    }else if (filterValue === "Rejected By Admin") {
      return bookingData.isApproved === "Rejected By Admin";
    } else {
      return bookingData
    }
  });
  // const hallId =userData.hallId
  // const hallName = userData.hallName

  // const handleBookingClick = (hallId,hallName) => {
  //   navigate('/bookingForm', { state: { hallId, hallName } });

  // };


  // const handleBookingClick = () => {
  //   sendData(data);
  // };


  return (
    <>

      <div className="mt-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Booking<span className="text-indigo-700"> Requests</span>  </h1>
    

          <div className="flex flex-wrap mb-4 justify-center my-6">
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "all" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "Approved By HOD" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("Approved By HOD")}
            >
              Pending
            </button>
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "Approved By Admin" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("Approved By Admin")}
            >
              Approved
            </button>
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "Rejected By Admin" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("Rejected By Admin")}
            >
              Rejected 
            </button>
          </div>



          {isLoading ? (
            <LoadingSpinner />
          ) : !emailVerified ? (

      

      <div class="flex items-center flex-col my-12 justify-center  ">

        {/* <div class="w-full lg:w-1/2"> */}
          <h1 class=" text-2xl  lg:text-4xl font-extrabold text-gray-800 my-3">Looks Like Yout Have Not Verified Your Email!</h1>
          <p class=" text-xl text-gray-800 my-5">Please click on the below button and verify email before booking.</p>
          {/* <p class="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
          <div>

            <Link to="/about" ><button
              class="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Verify Email
            </button>
            </Link>
          </div>
        {/* </div> */}
      </div>

    ) : (
          
          
            Array.isArray(filteredBookings) && filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking._id} className="my-2 ">
                  
                  <div className="flex  w-full items-center justify-center ">
                    <div className="w-full rounded-xl p-12  shadow-2xl shadow-blue-200 md:w-8/12  lg:w-10/12 bg-white ">

                      <div className="grid grid-cols-1 gap-6  lg:grid-cols-12">

{/* 
                        <div className="grid-cols-1 lg:col-end-12 col-span-1">
                         a
                        </div> */}


                        <div className="col-span-1 lg:col-span-12 ">
                          <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-zinc-700">{booking.name}</h2>
                            {/* <p className="mt-2 text-l font-semibold text-zinc-700">{booking.location}</p> */}
                            {/* <p className="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p> */}
                          </div>
                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Booked Hall Name</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.bookedHallName}</p>
                            
                            </div>
                            
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Name</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.eventName}</p>
                            </div>
                          </div>


                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Organizing Club</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.organizingClub}</p>
                            </div>

                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Department</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.department}</p>
                            </div>
                          </div>
                          {/* <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Booking Id</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking._id}</p>
                        </div>
                      </div> */}


                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Date</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700"> {format(new Date(booking.eventDate), "EEEE dd-MM-yyyy")}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Start Time</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.startTime).slice(0, -1)), "hh:mm aa")}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">End Time</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.endTime).slice(0, -1)), "hh:mm aa")}</p>
                            </div>
                          </div>




                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Event Manager</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.eventManager}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Phone Number</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.phoneNumber}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Alternate Number</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{booking.altNumber}</p>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                            <div>
                              <p className="font-bold text-zinc-700">Created At</p>
                            </div>

                            <div>
                              <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.createdAt)), "EEEE dd-MM-yyyy hh:mm aa")}</p>
                            </div>
                          </div>



                          <div className="mt-6 ">
                            {/* <div>
                              <p className="text-m  text-xl sm:text-3xl md:text-4xl  lg:text-3xl xl:text-3xl  text-zinc-700 font-bold ">Status</p>
                            </div> */}

                           
                              {booking.isApproved === "Approved By Admin" && (
                                  <ApprovedByAdmin/>

                                // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-green-500 font-black">
                                //   {booking.isApproved}
                                // </p>
                              )}
                                {booking.isApproved === "Approved By HOD" && (
                                  <ApprovedByHod/>

                            // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-yellow-500 font-black">
                            //   {booking.isApproved}
                            // </p>
                                )}  

                              {booking.isApproved === "Rejected By Admin" && (
                                  <RejectedByAdmin/>
                                // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-red-500 font-black">
                                //   {booking.isApproved}

                                // </p>
                              )}
                            
                          </div>









                          <div className="mt-6 grid grid-cols-3 gap-4">
                            {/* <Link to={`/bookingForm`}> */}
                            <button className="w-full rounded-xl border-2 border-green-500 bg-white px-3 py-2 font-semibold text-green-500 hover:bg-green-500 hover:text-white"
                              onClick={() => updateBooking(booking._id, "Approved By Admin")}
                            >
                              <>
                              {isLoading ? (
                                <LoadingSpinner />
                                ) : 
                                 
                                    "Approve"}
                                    </>
                            </button>
                            {/* </Link> */}
                            <button className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                              onClick={() => updateBooking(booking._id, "Rejected By Admin")}>
                               <>
                              {isLoading ? (
                                <LoadingSpinner />
                                ) : 
                                 
                                    "Reject"}
                                    </>
                            </button>
                            <button className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => deleteBooking(booking._id)}
                      >
                        Delete Booking
                      </button>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">No Bookings Requests found.</h2>

            )
          )}


      </div>
    </>
  );
};

export default BookingsAdmin;
