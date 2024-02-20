import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  CardHeader,
  CardBody,
  Avatar,
  Drawer,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  Squares2X2Icon,
  ChartBarSquareIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellIcon,
  ChevronRightIcon,
  ArrowUpRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import SemiCircleProgressBar from "react-progressbar-semicircle";

const Reportgen = () => {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize a variable to keep track of the number of times the effect has run
    let fetchCount = 0;
  
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/patient-details/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPatients(data);
        setLoading(false);
        fetchCount++; // Increment the fetchCount after successfully fetching data
        console.log("Fetched data:", data); // Log fetched data
      } catch (error) {
        console.error("Error fetching patient information:", error);
        setLoading(true);
      }
    };
  
    // Call fetchData if fetchCount is less than 2
    if (fetchCount < 2) {
      fetchData();
    }
  }, []);

  const patientdata = [
    {
      name: "John Doe",
      age: 25,
      gender: "Male",
      id: "ABC123",
      waitingOrPending: true,
    },
    {
      name: "Jane Doe",
      age: 30,
      gender: "Female",
      id: "XYZ456",
      waitingOrPending: false,
    },
    {
      name: "Bob Smith",
      age: 40,
      gender: "Male",
      id: "DEF789",
      waitingOrPending: true,
    },
    {
      name: "Alice Johnson",
      age: 28,
      gender: "Female",
      id: "GHI321",
      waitingOrPending: false,
    },
    {
      name: "Chris Williams",
      age: 35,
      gender: "Male",
      id: "JKL987",
      waitingOrPending: true,
    },
    {
      name: "John Doe",
      age: 25,
      gender: "Male",
      id: "ABC123",
      waitingOrPending: true,
    },
    {
      name: "Jane Doe",
      age: 30,
      gender: "Female",
      id: "XYZ456",
      waitingOrPending: false,
    },
    {
      name: "Bob Smith",
      age: 40,
      gender: "Male",
      id: "DEF789",
      waitingOrPending: true,
    },
    {
      name: "Alice Johnson",
      age: 28,
      gender: "Female",
      id: "GHI321",
      waitingOrPending: false,
    },
    {
      name: "Chris Williams",
      age: 35,
      gender: "Male",
      id: "JKL987",
      waitingOrPending: true,
    },
  ];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenheight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-full h-full flex flex-row">
      <div className={`w-full h-full  px-4`}>
        <div
          className={`w-full h-16 flex flex-row items-center  ${screenWidth<460?"justify-center":"px-8"}`}
        >
          <Typography variant="h3" color="blue-gray">
            List of Patients
          </Typography>
        </div>
        <div
          className={`w-full h-5/6 pt-2 gap-5 flex flex-col  px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-blue-400 scrollbar-track-transparent scroll-smooth`}
        >
          {screenWidth >= 690 &&
            patients.map((item, index) => (
              <Card
                color="white"
                shadow={true}
                className="w-full bg-white flex flex-row justify-center items-center my-1 py-1 px-8"
                key={index}
              >
                <div className={`w-3/6`}>
                  <div className={`flex flex-row gap-4 py-2 px-2 items-center`}>
                    <Avatar
                      size="md"
                      variant="circular"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      alt="tania andrew"
                    />
                    <div className="flex w-full flex-col">
                      <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray">
                          {item.user_id}
                        </Typography>
                      </div>
                      <Typography color="blue-gray" className="text-start">
                        25,{item.PersonalDetails.PatientDetails.Gender}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className={`w-1/6 text-base text-center font-medium`}>
                  ID: #{item.user_id[0]}
                      {item.user_id[1]}
                      {item.user_id[2]}-
                      {item.PersonalDetails.PatientDetails.Gender[0]}
                </div>
                <div className={`w-2/6  flex flex-row justify-end`}>
                  <div
                    className={`flex flex-row gap-1 items-center justify-end px-4 w-full `}
                  >
                    <div
                      className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
                    >
                      Create Report
                    </div>
                    <ArrowUpRightIcon
                      color="blue"
                      className="w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>
              </Card>
            ))}
          {screenWidth < 690 &&
            screenWidth >= 600 &&
            patients.map((item, index) => (
              <Card
                color="white"
                shadow={true}
                className="w-full bg-white flex flex-row justify-center items-center my-1 py-1 px-8"
                key={index}
              >
                <div className={`w-1/2`}>
                  <div className={`flex flex-row gap-4 py-2 px-2 items-center`}>
                    <Avatar
                      size="md"
                      variant="circular"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      alt="tania andrew"
                    />
                    <div className="flex w-full flex-col">
                      <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray">
                          {item.name}
                        </Typography>
                      </div>
                      <Typography color="blue-gray" className="text-start">
                        {item.age},{item.gender}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-1/2 h-full flex flex-col gap-4 items-center justify-center`}
                >
                  <div className={`w-full text-base text-center font-medium`}>
                    ID: {item.id}
                  </div>
                  <div className={`w-full  flex flex-row `}>
                    <div
                      className={`flex flex-row gap-1 items-center justify-center px-4 w-full `}
                    >
                      <div
                        className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
                      >
                        Create Report
                      </div>
                      <ArrowUpRightIcon
                        color="blue"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          {screenWidth < 600 &&
            screenWidth >= 400 &&
            patients.map((item, index) => (
              <Card
                color="white"
                shadow={true}
                className="w-full bg-white flex flex-row justify-center items-center my-1 py-1 px-8 gap-2"
                key={index}
              >
                <div className={`w-1/3 h-full`}>
                  <div className={`flex flex-row gap-4 py-2 px-2 items-center justify-center`}>
                    <Avatar
                      size="xl"
                      variant="circular"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      alt="tania andrew"
                    />
                  </div>
                </div>
                <div className={`w-2/3 h-full flex flex-col py-2 gap-2`}>
                  <div className="flex w-full flex-col">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray">
                        {item.name}
                      </Typography>
                    </div>
                    <Typography color="blue-gray" className="text-start">
                      {item.age},{item.gender}
                    </Typography>
                  </div>
                  <div className={`w-full text-base text-start font-medium`}>
                    ID: {item.id}
                  </div>
                  <div className={`w-full  flex flex-row justify-end`}>
                    <div
                      className={`flex flex-row gap-1 items-center justify-start w-full `}
                    >
                      <div
                        className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
                      >
                        Create Report
                      </div>
                      <ArrowUpRightIcon
                        color="blue"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          {screenWidth < 400 &&
            patients.map((item, index) => (
              <Card
                color="white"
                shadow={true}
                className="w-full bg-white flex flex-col justify-center items-center my-1 py-1 px-8"
                key={index}
              >
                <div className={`w-full h-full`}>
                  <div className={`flex flex-row gap-4 py-2 px-2 items-center justify-center`}>
                    <Avatar
                      size="xl"
                      variant="circular"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      alt="tania andrew"
                    />
                  </div>
                </div>
                <div className={`w-full h-full flex flex-col py-2 gap-2`}>
                  <div className="flex w-full flex-col items-center">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray">
                        {item.name}
                      </Typography>
                    </div>
                    <Typography color="blue-gray" className="text-start">
                      {item.age},{item.gender}
                    </Typography>
                  </div>
                  <div className={`w-full text-base text-center font-medium`}>
                    ID: {item.id}
                  </div>
                  <div className={`w-full  flex flex-row justify-end`}>
                    <div
                      className={`flex flex-row gap-1 items-center justify-center w-full `}
                    >
                      <div
                        className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
                      >
                        Create Report
                      </div>
                      <ArrowUpRightIcon
                        color="blue"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reportgen;
