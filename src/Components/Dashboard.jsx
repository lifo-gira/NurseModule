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
  ChevronDownIcon,
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

const Dashboard = ({ onReportClick }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flagMinusOneCount, setFlagMinusOneCount] = useState(0);
  const [flagZeroCount, setFlagZeroCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-backup-vap2.onrender.com/patient-details/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPatients(data);
        setLoading(false);

        // Count occurrences of flag == -1 and flag == 0
        const minusOneCount = data.filter(
          (patient) => patient.flag === -1
        ).length;
        const zeroCount = data.filter((patient) => patient.flag === 0).length;

        setFlagMinusOneCount(minusOneCount);
        setFlagZeroCount(zeroCount);

        console.log("Fetched data:", data); // Log fetched data
      } catch (error) {
        console.error("Error fetching patient information:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let fetchCount = 0;

    async function fetchUsers() {
      try {
        const response = await fetch("https://api-backup-vap2.onrender.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const doctors = data.filter((user) => user.type === "doctor");
        setUsers(doctors);
        fetchCount++;
        console.log(doctors); // Log fetched data for doctors
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (fetchCount < 2) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    setPatients(patients);
    console.log(patients);
  }, [patients]);

  // const doctordata = [
  //   {
  //     name: "John Doe",
  //     profession: "cardiologist",
  //   },
  //   {
  //     name: "John Doe",
  //     profession: "cardiologist",
  //   },
  //   {
  //     name: "John Doe",
  //     profession: "cardiologist",
  //   },
  //   {
  //     name: "John Doe",
  //     profession: "cardiologist",
  //   },
  //   {
  //     name: "John Doe",
  //     profession: "cardiologist",
  //   },
  //   {
  //     name: "John Doe",
  //     profession: "cardiologist",
  //   },
  // ];
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

  const dat = [
    { name: "Inbasekar S", prof: "Ortho Surgeon" },
    { name: "Inbasekar S", prof: "Ortho Surgeon" },
    { name: "Inbasekar S", prof: "Ortho Surgeon" },
    { name: "Inbasekar S", prof: "Ortho Surgeon" },
    { name: "Inbasekar S", prof: "Ortho Surgeon" },
  ];

  return (
    <>
      {false ? (
        <p className="font-poppins">Loading...</p>
      ) : (
        <div
          className={`w-full h-full  ${
            screenWidth < 1180 ? "flex flex-col " : "flex flex-row"
          }`}
        >
          <div
            className={`h-full  px-4 ${
              screenWidth < 1180 ? "w-full" : "w-4/6"
            }`}
          >
            <div
              className={`w-full items-center px-8 ${
                screenWidth < 460
                  ? "flex flex-col py-4 h-full"
                  : "h-16 flex flex-row justify-between"
              }`}
            >
              <Typography
                variant="h3"
                color="blue-gray"
                className="font-poppins"
              >
                List of Patients
              </Typography>
              <div
                className={`flex flex-row justify-between gap-2 items-center cursor-pointer`}
              >
                <Typography variant="h5" color="cyan" className="font-poppins">
                  View all
                </Typography>
                <ChevronRightIcon className="w-4 h-4" />
              </div>
            </div>
            <div
              className={`w-full h-5/6 pt-2 gap-5 flex flex-col  px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-blue-400 scrollbar-track-transparent scroll-smooth`}
            >
              {screenWidth >= 690 &&
                patients.map((item, index) => (
                  <Card
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-row justify-center items-center my-1 py-1"
                    key={index}
                  >
                    <div className={`w-3/6`}>
                      <div
                        className={`flex flex-row gap-4 py-2 px-2 items-center`}
                      >
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                        <div className="flex w-full flex-col">
                          <div className="flex items-center justify-between">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-poppins"
                            >
                              {item.user_id}
                            </Typography>
                          </div>
                          <Typography
                            color="blue-gray"
                            className="text-start font-poppins"
                          >
                            25,{item.PersonalDetails.PatientDetails.Gender}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={`w-1/6 text-base font-medium font-poppins`}>
                      ID: #{item.user_id[0]}
                      {item.user_id[1]}
                      {item.user_id[2]}-
                      {item.PersonalDetails.PatientDetails.Gender[0]}
                    </div>
                    <div className={`w-2/6  flex flex-row  `}>
                      <div
                        className={`rounded-lg py-0.5 font-medium w-1/2 px-4 font-poppins ${
                          item.flag === 0
                            ? "text-blue-900 bg-blue-300"
                            : "text-red-900 bg-red-500 bg-opacity-40"
                        }`}
                      >
                        {item.flag === 0 ? "Assigned" : "Pending"}
                      </div>
                      <div
                        className={`flex flex-row gap-1 items-center justify-end px-4 w-1/2 `}
                      >
                        <div
                          className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer font-poppins`}
                          onClick={() => onReportClick(item.patient_id)}
                        >
                          Report
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
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-row justify-center items-center my-1 py-1"
                    key={index}
                  >
                    <div className={`w-1/2 h-full`}>
                      <div
                        className={`flex flex-row gap-4 py-2 px-2 items-center`}
                      >
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                        <div className="flex w-full flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-poppins"
                            >
                              {item.user_id}
                            </Typography>
                          </div>
                          <Typography
                            color="blue-gray"
                            className="text-start font-poppins"
                          >
                            25,{item.PersonalDetails.PatientDetails.Gender}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={`w-1/2 h-full flex flex-col gap-4`}>
                      <div
                        className={`h-1/6 w-full text-base font-medium text-start font-poppins`}
                      >
                        ID: #{item.user_id[0]}
                        {item.user_id[1]}
                        {item.user_id[2]}-
                        {item.PersonalDetails.PatientDetails.Gender[0]}
                      </div>
                      <div className={`h-2/6 w-full flex flex-row  `}>
                        <div
                          className={` rounded-lg py-0.5 font-medium  w-1/2 px-4 font-poppins ${
                            item.flag === 0
                              ? "text-blue-900 bg-blue-300"
                              : "text-red-900 bg-red-500 bg-opacity-40"
                          }`}
                        >
                          {item.flag === 0 ? "Assigned" : "Pending"}
                        </div>
                        <div
                          className={`flex flex-row gap-1 items-center justify-end px-4 w-1/2 `}
                        >
                          <div
                            className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer font-poppins`}
                            onClick={() => onReportClick(item.patient_id)}
                          >
                            Report
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
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-row justify-center items-center my-1 py-1"
                    key={index}
                  >
                    <div className={`w-1/3 h-full`}>
                      <div
                        className={`flex flex-row gap-4 py-2 px-2 items-center justify-center`}
                      >
                        <Avatar
                          size="xl"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                      </div>
                    </div>
                    <div className={`w-2/3 h-full flex flex-col py-2`}>
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-poppins"
                          >
                            {item.user_id}
                          </Typography>
                        </div>
                        <Typography
                          color="blue-gray"
                          className="text-start font-poppins"
                        >
                          25,{item.PersonalDetails.PatientDetails.Gender}
                        </Typography>
                        <div
                          className={`h-1/6 w-full text-base font-medium text-start font-poppins`}
                        >
                          ID: #{item.user_id[0]}
                          {item.user_id[1]}
                          {item.user_id[2]}-
                          {item.PersonalDetails.PatientDetails.Gender[0]}
                        </div>
                        <div className={`h-2/6 w-full flex flex-row  `}>
                          <div
                            className={` rounded-lg py-0.5 font-medium  w-1/2 px-4 font-poppins ${
                              item.flag === 0
                                ? "text-blue-900 bg-blue-300"
                                : "text-red-900 bg-red-500 bg-opacity-40"
                            }`}
                          >
                            {item.flag === 0 ? "Assigned" : "Pending"}
                          </div>
                          <div
                            className={`flex flex-row gap-1 items-center justify-end px-4 w-1/2 `}
                          >
                            <div
                              className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer font-poppins`}
                              onClick={() => onReportClick(item.patient_id)}
                            >
                              Report
                            </div>
                            <ArrowUpRightIcon
                              color="blue"
                              className="w-4 h-4 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              {screenWidth < 400 &&
                patients.map((item, index) => (
                  <Card
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-col justify-center items-center my-1 py-1"
                    key={index}
                  >
                    <div className={`h-1/3 w-full`}>
                      <div
                        className={`flex flex-row gap-4 py-1 px-2 items-center justify-center`}
                      >
                        <Avatar
                          size="xl"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                      </div>
                    </div>
                    <div
                      className={`h-2/3 w-full flex flex-col items-center py-2`}
                    >
                      <div className="flex w-full flex-col gap-2 justify-center items-center">
                        <div className="flex items-center justify-between">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-poppins"
                          >
                            {item.user_id}
                          </Typography>
                        </div>
                        <Typography
                          color="blue-gray"
                          className="text-center font-poppins"
                        >
                          25,{item.PersonalDetails.PatientDetails.Gender}
                        </Typography>
                        <div
                          className={` w-full text-base font-medium text-center font-poppins`}
                        >
                          ID: #{item.user_id[0]}
                          {item.user_id[1]}
                          {item.user_id[2]}-
                          {item.PersonalDetails.PatientDetails.Gender[0]}
                        </div>
                        <div className={`w-full flex flex-row px-6`}>
                          <div
                            className={` rounded-lg py-0.5 font-medium  w-1/2 font-poppins ${
                              item.flag === 0
                                ? "text-blue-900 bg-blue-300"
                                : "text-red-900 bg-red-500 bg-opacity-40"
                            }`}
                          >
                            {item.flag === 0 ? "Assigned" : "Pending"}
                          </div>
                          <div
                            className={`flex flex-row gap-1 items-center justify-end w-1/2 `}
                          >
                            <div
                              className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
                              onClick={() => onReportClick(item.patient_id)}
                            >
                              Report
                            </div>
                            <ArrowUpRightIcon
                              color="blue"
                              className="w-4 h-4 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
          <div
            className={`  ${
              screenWidth < 1180 && screenWidth >= 520
                ? "w-full flex flex-col"
                : screenWidth < 520
                ? "w-full"
                : " w-2/6 flex flex-col px-4 pb-5 gap-4"
            }`}
          >
            <div
              className={` w-full flex flex-col ${
                screenWidth < 1180 ? "h-2/3" : "h-1/3"
              }`}
            >
              <div
                className={`h-1/6 w-full  flex flex-row items-center py-8 ${
                  screenWidth < 1180 ? "justify-center" : "justify-between"
                }`}
              >
                <Typography
                  variant="h4"
                  color="black"
                  className="text-start font-poppins"
                >
                  Patients
                </Typography>
                <div
                  className={`flex flex-row font-poppins items-center gap-2 text-sm bg-gray-50 rounded-lg py-1 px-2`}
                >
                  2024
                  <ChevronDownIcon color="gray" className={`w-3 h-3`} />
                </div>
              </div>
              <div
                className={`h-5/6  gap-4 w-full  ${
                  screenWidth < 1180 && screenWidth >= 520
                    ? "flex flex-row px-8"
                    : screenWidth < 520
                    ? "w-full flex flex-col justify-center items-center"
                    : "flex flex-row"
                }`}
              >
                <Card
                  color="transparent"
                  shadow={true}
                  className={` bg-gradient-to-br from-light-blue-50 via-light-blue-50 to-white flex flex-col justify-center items-center my-1 py-1 ${
                    screenWidth < 1180 ? "w-3/4 h-1/2" : "w-1/2"
                  }`}
                >
                  <div className="w-full h-1/4 font-semibold text-black text-lg font-poppins">
                    Patients Assigned
                  </div>
                  <div className="w-full h-3/4 flex flex-row items-center">
                    <div className="w-1/2 text-5xl text-black font-semibold font-poppins">
                      {flagZeroCount}
                    </div>
                    <div className="w-1/2 flex justify-center">
                      <UserCircleIcon color="skyblue" className="w-20 h-20" />
                    </div>
                  </div>
                </Card>
                <Card
                  color="transparent"
                  shadow={true}
                  className={`bg-gradient-to-br from-red-100 via-red-50 to-white flex flex-col justify-center items-center my-1 py-1 ${
                    screenWidth < 1180 ? "w-3/4 h-1/2" : "w-1/2"
                  }`}
                >
                  <div className="w-full h-1/4 font-semibold text-black text-lg font-poppins">
                    Patients Pending
                  </div>
                  <div className="w-full h-3/4 flex flex-row items-center">
                    <div className="w-1/2 text-5xl text-black font-semibold font-poppins">
                      {flagMinusOneCount}
                    </div>
                    <div className="w-1/2 flex justify-center">
                      <UserCircleIcon color="red" className="w-20 h-20" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className={`h-2/3 w-full   flex flex-col`}>
              <div
                className={`w-full h-1/6  text-start flex items-center ${
                  screenWidth < 1180 ? "py-8 justify-center" : ""
                }`}
              >
                <Typography
                  variant="h4"
                  color="black"
                  className="text-start font-poppins"
                >
                  Doctors Availabe
                </Typography>
              </div>
              {screenWidth >= 1180 && (
                <Card className="w-full h-5/6 py-2  flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent scrollbar-thumb-rounded-2xl gap-2">
                  {/* {dat.map((item, index) => (
                    <Card
                      className="w-full h-full flex flex-row items-center justify-center py-3 px-8"
                      key={index}
                    >
                      <div className="w-1/3 h-full flex justify-center items-center">
                        <Avatar
                          size="xl"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="w-2/3 h-full flex flex-col  justify-center font-poppins">
                        <Typography variant="h6" color="blue-gray">
                          {item.name}
                        </Typography>
                        <Typography variant="h7" color="black" className="font-poppins">
                          {item.prof}
                        </Typography>
                      </div>
                    </Card>
                  ))} */}
                  <div className={`w-full h-1/3 flex flex-row`}>
                    <div className={`w-1/3 h-full`}>
                      <div className="w-full h-1/2 flex justify-center items-center">
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="w-full h-1/2 flex flex-col  justify-center font-poppins">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className={`font-poppins text-xs`}
                        >
                          Dr. James Williams
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className={`font-poppins text-xs`}
                        >
                          Ortho Surgeon
                        </Typography>
                      </div>
                    </div>
                    <div className={`w-1/3 h-full`}>
                    <div className="w-full h-1/2 flex justify-center items-center">
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="tania andrew"
                          className="object-cover"
                        />
                      </div>
                      <div className="w-full h-1/2 flex flex-col  justify-center font-poppins">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className={`font-poppins text-xs`}
                        >
                          Dr. Jermy Alford
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className={`font-poppins text-xs`}
                        >
                          Ortho Surgeon
                        </Typography>
                      </div>
                    </div>
                    <div className={`w-1/3 h-full`}>
                    <div className="w-full h-1/2 flex justify-center items-center">
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="w-full h-1/2 flex flex-col  justify-center font-poppins">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className={`font-poppins text-xs`}
                        >
                          Dr. Susan Jacob
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className={`font-poppins text-xs`}
                        >
                          Ortho Surgeon
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={`w-full h-1/3 flex flex-row`}>
                    <div className={`w-1/2 h-full`}>
                    <div className="w-full h-1/2 flex justify-center items-center">
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="w-full h-1/2 flex flex-col  justify-center font-poppins">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className={`font-poppins text-xs`}
                        >
                          Dr. Ling Chan
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className={`font-poppins text-xs`}
                        >
                          Ortho Surgeon
                        </Typography>
                      </div>
                    </div>
                    <div className={`w-1/2 h-full`}>
                    <div className="w-full h-1/2 flex justify-center items-center">
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="w-full h-1/2 flex flex-col  justify-center font-poppins">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className={`font-poppins text-xs`}
                        >
                          Dr. Marie Mcarthy
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className={`font-poppins text-xs`}
                        >
                          Ortho Surgeon
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={`w-full h-1/3 flex flex-row`}>
                    <div className={`w-1/3 h-full`}>
                    <div className="w-full h-1/2 flex justify-center items-center">
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="w-full h-1/2 flex flex-col  justify-center font-poppins">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className={`font-poppins text-xs`}
                        >
                          Dr. Jones
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className={`font-poppins text-xs`}
                        >
                          Ortho Surgeon
                        </Typography>
                      </div>
                    </div>
                    <div className={`w-1/3 h-full`}>
                    <div className="w-full h-1/2 flex justify-center items-center">
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="w-full h-1/2 flex flex-col  justify-center font-poppins">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className={`font-poppins text-xs`}
                        >
                          Dr. Sofie Richard
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className={`font-poppins text-xs`}
                        >
                          Ortho Surgeon
                        </Typography>
                      </div>
                    </div>
                    <div className={`w-1/3 h-full`}>
                    <div className="w-full h-1/2 flex justify-center items-center">
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="w-full h-1/2 flex flex-col  justify-center font-poppins">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className={`font-poppins text-xs`}
                        >
                          Dr. Andrew Lin
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className={`font-poppins text-xs`}
                        >
                          Ortho Surgeon
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              {screenWidth < 1180 && (
                <div className="w-full h-full px-8 pb-1  flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent scrollbar-thumb-rounded-2xl gap-4">
                  {users.map((item, index) => (
                    <Card
                      className="w-full h-full flex flex-col items-center justify-center py-3 px-4 gap-4"
                      key={index}
                    >
                      <div className="w-full h-1/3">
                        <Avatar
                          size="xl"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                      </div>
                      <div className="h-2/3 w-full flex flex-col  justify-center font-poppins\">
                        <Typography variant="h6" color="blue-gray">
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h7"
                          color="black"
                          className="font-poppins"
                        >
                          {item.user_id}
                        </Typography>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
