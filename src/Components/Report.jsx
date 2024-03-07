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
  Select,
  Option,
  Button
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

import Profilebar from "./Profilebar";

import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;
  const radius = 5; // Set the radius for the rounded corner
  return (
    <g>
      <path
        d={`M${x},${y + radius} L${x},${y + height} L${x + width},${
          y + height
        } L${x + width},${y + radius} Q${x + width},${y} ${
          x + width - radius
        },${y} L${x + radius},${y} Q${x},${y} ${x},${y + radius}`}
        fill={fill}
      />
    </g>
  );
};

const CustomBar1 = (props) => {
  const { x, y, width, height, fill } = props;
  const radius = 5; // Set the radius for the rounded corner
  return (
    <g>
      {/* Render the bar with rounded bottom edges */}
      <path
        d={`M${x},${y} L${x},${y + height} L${x + width},${y + height} L${
          x + width
        },${y} Q${x + width},${y + radius} ${x + width - radius},${
          y + radius
        } L${x + radius},${y + radius} Q${x},${y + radius} ${x},${y} Z`}
        fill={fill}
      />
    </g>
  );
};

const Report = ({ onDashboard, userId,assement }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [runningData, setRunningData] = useState([]);
  const [squatsData, setsquatsData] = useState([]);
  const [pushupsData, setpushupsData] = useState([]);
  const [pullupsData, setpullupsData] = useState([]);
  const [leghipData, setleghipData] = useState([]);
  const [patientDetails, setpatientDetails] = useState([]);
  const [report, setreport] = useState([]);
  const [documentId, setdocumentId] = useState([]);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/patient-info/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setPatients(data);
          console.log(data);
          // Extract only the "Running" data
          const newPatientDetailsData = data.PersonalDetails.PatientDetails;
          const newReportData = data.PersonalDetails.Reports;
          console.log(newReportData);
          setpatientDetails(newPatientDetailsData);
          setdocumentId(data._id);
          setreport(newReportData);
          const runningExerciseData = data?.Exercises?.running.values || [];
          const squatsExerciseData = data?.Exercises?.squats.values || [];
          const pushupsExerciseData = data?.Exercises?.pushups.values || [];
          const pullupsExerciseData = data?.Exercises?.pullups.values || [];
          const leghipExerciseData =
            data?.Exercises?.LegHipRotation.values || [];
          setRunningData(runningExerciseData.map((value) => parseFloat(value)));
          setsquatsData(squatsExerciseData.map((value) => parseFloat(value)));
          setpushupsData(pushupsExerciseData.map((value) => parseFloat(value)));
          setpullupsData(pullupsExerciseData.map((value) => parseFloat(value)));
          setleghipData(leghipExerciseData.map((value) => parseFloat(value)));
        } else {
          setError(data.detail || "Failed to fetch patient information");
        }
      } catch (error) {
        setError("Error fetching patient information");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, [userId]);

  useEffect(() => {
    setPatients(patients);
    setpatientDetails(patientDetails);
    setreport(report);
    setdocumentId(documentId);
    console.log("UserId:", documentId);
    console.log(report);
  }, [patients, patientDetails, report, documentId]);

  const combinedChartData = runningData.map((value, index) => ({
    name: ` ${index + 1}`,
    Running: value,
    Squats: squatsData[index],
    Pushups: pushupsData[index],
    Pullups: pullupsData[index],
    LegHipRotation: leghipData[index],
  }));

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let fetchCount = 0;

    async function fetchUsers() {
      try {
        const response = await fetch("http://127.0.0.1:8000/users");
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

  const data = [
    {
      name: "11 Jun",
      uv: -40,
      pv: 24,
      amt: 24,
    },
    {
      uv: -30,
      pv: 13,
      amt: 22,
    },
    {
      name: "12 Jun",
      uv: -60,
      pv: 98,
      amt: 22,
    },
    {
      uv: -27,
      pv: 39,
      amt: 20,
    },
    {
      name: "13 Jun",
      uv: -18,
      pv: 50,
      amt: 21,
    },
    {
      uv: -23,
      pv: 38,
      amt: 25,
    },
    {
      name: "14 Jun",
      uv: -80,
      pv: 43,
      amt: 21,
    },
  ];

  const data1 = [
    {
      name: "5k",
      uv: 10,
      pv: 4,
      amt: 24,
    },
    {
      name: "10k",
      uv: 30,
      pv: 63,
      amt: 22,
    },
    {
      name: "15k",
      uv: 20,
      pv: 98,
      amt: 22,
    },
    {
      name: "20k",
      uv: 37,
      pv: 19,
      amt: 20,
    },
    {
      name: "25k",
      uv: 28,
      pv: 38,
      amt: 21,
    },
    {
      name: "30k",
      uv: 3,
      pv: 48,
      amt: 25,
    },
    {
      name: "35k",
      uv: 54,
      pv: 43,
      amt: 21,
    },
  ];

  const data2 = [
    {
      name: "JAN",
      uv: 40,
      pv: 24,
      amt: 24,
    },
    {
      name: "FEB",
      uv: 30,
      pv: 13,
      amt: 22,
    },
    {
      name: "MAR",
      uv: 20,
      pv: 98,
      amt: 22,
    },
    {
      name: "APR",
      uv: 27,
      pv: 39,
      amt: 20,
    },
    {
      name: "MAY",
      uv: 18,
      pv: 48,
      amt: 21,
    },
    {
      name: "JUN",
      uv: 23,
      pv: 38,
      amt: 25,
    },
    {
      name: "JUL",
      uv: 34,
      pv: 43,
      amt: 21,
    },
  ];
  const data4 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data5 = [
    {
      name: 2021,
      uv: 20,
      pv: 0,
      amt: 2400,
    },
    {
      name: 2022,
      uv: 80,
      pv: 60,
      amt: 2210,
    },
    {
      name: 2023,
      uv: 50,
      pv: 30,
      amt: 2290,
    },
    {
      name: 2024,
      uv: 110,
      pv: 90,
      amt: 2290,
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

  const hangleFlag = (
    patient_id,
    newFlag,
    doctorName,
    doctorID,
    scheduled_date,
    meeting_id
  ) => {
    console.log(doctorName);
    fetch(
      `http://127.0.0.1:8000/update_flag/${patient_id}/${newFlag}/${doctorName}/${doctorID}/${scheduled_date}/${meeting_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_flag: newFlag,
          doctor_name: doctorName,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        console.log("Updated Data:", updatedData);
      })
      .catch((error) => {
        console.error("Error updating flag:", error);
      });
  };

  const [selectedDoctor, setSelectedDoctor] = useState("");

  const handleUpdate = () => {
    // Your logic to handle the update here
    console.log("Selected doctor:", selectedDoctor);
    hangleFlag(
      userId,
      0,
      selectedDoctor,
      selectedId,
      formattedDateTime,
      documentId
    );
    <Profilebar />;
  };

  const [selectedId, setSelectedId] = useState("");

  const handleSelectedDoctorChange = (e) => {
    const [id, name] = e.split(",");
    setSelectedId(id);
    setSelectedDoctor(name);
    console.log(selectedId, selectedDoctor);
  };

  useEffect(() => {
    console.log("Selected ID:", selectedId);
    console.log("Selected name:", selectedDoctor);
  }, [selectedId, selectedDoctor]);

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [formattedDateTime, setFormattedDateTime] = useState(null); // State to hold formatted date and time

  const handleButtonClick = () => {
    setShowDateTimePicker(!showDateTimePicker);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateCombinedDateTime(date, selectedTime);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    updateCombinedDateTime(selectedDate, time);
  };

  const updateCombinedDateTime = (date, time) => {
    const combined = new Date(date);
    combined.setHours(time.split(":")[0]);
    combined.setMinutes(time.split(":")[1]);

    const year = combined.getFullYear();
    const month = combined.getMonth() + 1;
    const day = combined.getDate();
    const hours = combined.getHours();
    const minutes = combined.getMinutes();

    const formattedDateTime = `(${year}, ${month}, ${day}, ${hours}, ${minutes})`; // Create formatted date and time
    setFormattedDateTime(formattedDateTime); // Update state with formatted date and time
    console.log("Combined DateTime:", formattedDateTime);
  };

  return (
    <div className={`w-full h-full bg-gray-200`}>
      {screenWidth >= 1535 && (
        <div
          className={`w-full h-1/5 rounded-b-3xl flex flex-row bg-gradient-to-r from-cyan-200 to-cyan-400 py-2`}
        >
          <div className={`w-1/2 h-full px-8 flex flex-row`}>
            <div className={`w-5/6 h-full  flex flex-row`}>
              <div className={`w-1/3 h-full flex items-center justify-center`}>
                <Avatar
                  size="xxl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div className={`w-2/3 h-full  text-start flex flex-col justify-center`} >
                <Typography variant="h5" color="white" className="font-poppins">
                  {patients.user_id}
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  32 , {patientDetails.Gender}
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  ID: 123456
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
              
            </div>
            <div className={`w-1/6`}>
            <Button className="w-full h-full items-center justify-center gap-2 font-poppins flex flex-col" onClick={assement}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                  View Assessment Report
                </Button>
              </div>
          </div>
          <div className={`w-1/2 h-full flex flex-col px-8`}>
            <div className={`w-5/6 h-2/3  flex flex-row ml-auto`}>
              <div
                className={`w-3/4 h-full  flex flex-col text-end justify-center`}
              >
                <Typography variant="h4" color="white" className="font-poppins">
                  {patients.doctor_assigned
                    ? patients.doctor_assigned
                    : "Doctor not assigned"}
                </Typography>

                {/* <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography> */}
              </div>
              <div className={`w-1/4 h-full  flex justify-center items-center`}>
                <Avatar
                  size="xl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
            </div>

            <div className={`w-full h-1/3  flex flex-row ml-auto`}>
              
              <div className={`w-2/3 flex justify-start`}>
                
                {!showDateTimePicker && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg font-poppins"
                    onClick={handleButtonClick}
                  >
                    {showDateTimePicker
                      ? "Hide"
                      : "Date & Time"}
                  </button>
                )}
                {showDateTimePicker && (
                  <div className={`w-full h-full flex items-center`}>
                    <div
                      className={`w-full gap-4 flex ml-auto flex-row justify-center items-center`}
                    >
                      {/* Date Calendar */}
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        className="bg-white rounded-lg w-full p-0.5 font-poppins"
                      />
                      {/* Time Picker */}
                      <TimePicker
                        disableClock={true}
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="bg-white rounded-lg w-1/2 font-poppins"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className={`w-1/3 flex justify-center`}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg font-poppins"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
              <div
                className={`w-1/3 flex ml-auto justify-center items-center font-poppins`}
              >
                <Select
                  label="Doctors Available"
                  className="bg-white rounded-lg"
                  // value={selectedDoctor}
                  onChange={handleSelectedDoctorChange}
                >
                  {users.map((user, index) => (
                    <Option key={index} value={`${user._id},${user.name}`}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="mt-2 ml-auto flex flex-row w-full gap-4">
              <div className="w-1/2 h-full"></div>
              <div className="w-1/2 h-full"></div>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 1535 && screenWidth >= 1180 && (
        <div
          className={`w-full  rounded-b-3xl flex flex-row bg-gradient-to-r from-cyan-200 to-cyan-400 py-2 h-1/5`}
        >
          <div className={`w-2/5 h-full px-8 `}>
            <div className={`w-full h-full flex flex-row`}>
              <div className={`w-1/3 h-full flex items-center justify-center`}>
                <Avatar
                  size="xxl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-2/3 h-full  text-start flex flex-col justify-center`}
              >
                <Typography variant="h5" color="white" className="font-poppins">
                  {patients.user_id}
                </Typography>
                <Typography
                  variant="h6"
                  color="white"
                  className="font-medium font-poppins"
                >
                  32 , {patientDetails.Gender}
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  ID: 123456
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
            </div>
          </div>
          <div
            className={`w-1/5 h-full px-8  flex flex-col items-center justify-center`}
          >
            <ArrowUturnLeftIcon className="w-16 h-16" onClick={onDashboard} />
            <Typography
              variant="h5"
              color="white"
              onClick={onDashboard}
              className="font-poppins"
            >
              Back to Dashboard
            </Typography>
          </div>
          <div className={`w-2/5 h-full px-8  flex flex-col`}>
            <div className={`w-full h-2/3  flex flex-row ml-auto`}>
              <div
                className={`w-3/4 h-full  flex flex-col text-end justify-center`}
              >
                <Typography variant="h4" color="white" className="font-poppins">
                  {patients.doctor_assigned
                    ? patients.doctor_assigned
                    : "Doctor not assigned"}
                </Typography>
                {/* <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography> */}
              </div>
              <div className={`w-1/4 h-full  flex justify-center items-center`}>
                <Avatar
                  size="xl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
            </div>

            <div className={`w-full h-1/3  flex ml-auto`}>
              <div
                className={`w-3/4 flex ml-auto justify-center items-center font-poppins`}
              >
                <Select
                  label="Doctors Available to Check"
                  className="bg-white rounded-lg"
                  // value={selectedDoctor}
                  onChange={handleSelectedDoctorChange}
                >
                  {users.map((user, index) => (
                    <Option key={index} value={`${user._id},${user.name}`}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            {showDateTimePicker && (
              <div className={`w-5/6 h-1/3  flex ml-auto`}>
                <div
                  className={`w-3/4 flex ml-auto justify-center items-center`}
                >
                  {/* Date Calendar */}
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="bg-white rounded-lg font-poppins"
                  />
                  {/* Time Picker */}
                  <TimePicker
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="bg-white rounded-lg ml-2 font-poppins"
                  />
                </div>
              </div>
            )}
            <div className="mt-2 ml-auto">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins"
                onClick={handleButtonClick}
              >
                {showDateTimePicker
                  ? "Hide Date & Time Picker"
                  : "Show Date & Time Picker"}
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 1180 && screenWidth >= 950 && (
        <div
          className={`w-full  rounded-b-3xl flex flex-col  bg-gradient-to-r from-cyan-200 to-cyan-400 py-2 h-80`}
        >
          <div
            className={`w-full h-1/6 px-8  flex flex-col items-center justify-center`}
          >
            <ArrowUturnLeftIcon className="w-16 h-16" onClick={onDashboard} />
            <Typography
              variant="h5"
              color="white"
              onClick={onDashboard}
              className="font-poppins"
            >
              Back to Dashboard
            </Typography>
          </div>
          <div className={`w-full h-5/6 flex flex-row`}>
            <div className={`w-1/2 h-full px-8 `}>
              <div className={`w-full h-full flex flex-row`}>
                <div
                  className={`w-1/3 h-full flex items-center justify-center`}
                >
                  <Avatar
                    size="xxl"
                    alt="avatar"
                    variant="rounded"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    className="border border-white shadow-xl  ring-2 ring-white"
                  />
                </div>
                <div
                  className={`w-2/3 h-full  text-start flex flex-col justify-center`}
                >
                  <Typography
                    variant="h5"
                    color="white"
                    className="font-poppins"
                  >
                    {patients.user_id}
                  </Typography>
                  <Typography
                    variant="h7"
                    color="white"
                    className="font-medium font-poppins"
                  >
                    32 , {patientDetails.Gender}
                  </Typography>
                  <Typography
                    variant="h7"
                    color="white"
                    className="font-medium"
                  >
                    ID: 123456
                  </Typography>
                  <Typography
                    variant="h7"
                    color="white"
                    className="font-medium font-poppins"
                  >
                    {report.map((report, index) => (
                      <div key={index}>
                        {report && (
                          <div>
                            <span>Diagnosis {index + 1}: </span>
                            <span>{report}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </Typography>
                </div>
              </div>
            </div>

            <div className={`w-1/2 h-full px-8  flex flex-col`}>
              <div className={`w-full h-2/3  flex flex-row ml-auto`}>
                <div
                  className={`w-3/4 h-full  flex flex-col text-end justify-center`}
                >
                  <Typography
                    variant="h4"
                    color="white"
                    className="font-poppins"
                  >
                    {patients.doctor_assigned
                      ? patients.doctor_assigned
                      : "Doctor not assigned"}
                  </Typography>
                  {/* <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography> */}
                </div>
                <div
                  className={`w-1/4 h-full  flex justify-center items-center`}
                >
                  <Avatar
                    size="xl"
                    alt="avatar"
                    variant="rounded"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    className="border border-white shadow-xl  ring-2 ring-white"
                  />
                </div>
              </div>

              <div className={`w-full h-1/3  flex ml-auto`}>
                <div
                  className={`w-3/4 flex ml-auto justify-center items-center`}
                >
                  <Select
                    label="Doctors Available to Check"
                    className="bg-white rounded-lg font-poppins"
                    // value={selectedDoctor}
                    onChange={handleSelectedDoctorChange}
                  >
                    {users.map((user, index) => (
                      <Option key={index} value={`${user._id},${user.name}`}>
                        {user.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          {showDateTimePicker && (
            <div className={`w-5/6 h-1/3  flex ml-auto`}>
              <div className={`w-3/4 flex ml-auto justify-center items-center`}>
                {/* Date Calendar */}
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  className="bg-white rounded-lg font-poppins"
                />
                {/* Time Picker */}
                <TimePicker
                  value={selectedTime}
                  onChange={handleTimeChange}
                  className="bg-white rounded-lg ml-2 font-poppins"
                />
              </div>
            </div>
          )}
          <div className="mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins"
              onClick={handleButtonClick}
            >
              {showDateTimePicker
                ? "Hide Date & Time Picker"
                : "Show Date & Time Picker"}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
      {screenWidth < 950 && screenWidth >= 500 && (
        <div
          className={`w-full  rounded-b-3xl flex flex-col  bg-gradient-to-r from-cyan-200 to-cyan-400 py-2 h-96`}
        >
          <div
            className={`w-full h-1/5 px-8  flex flex-col items-end justify-center`}
          >
            <ArrowUturnLeftIcon className="w-16 h-16" onClick={onDashboard} />
            <Typography
              variant="h5"
              color="white"
              onClick={onDashboard}
              className="font-poppins"
            >
              Back to Dashboard
            </Typography>
          </div>
          <div className={`w-full h-2/5 px-8 `}>
            <div className={`w-full h-full flex flex-row`}>
              <div className={`w-1/3 h-full flex items-center justify-center`}>
                <Avatar
                  size="xxl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-2/3 h-full  text-start flex flex-col justify-center`}
              >
                <Typography variant="h5" color="white" className="font-poppins">
                  {patients.user_id}
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  32 , {patientDetails.Gender}
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  ID: 123456
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
            </div>
          </div>

          <div className={`w-full h-2/5 px-8  flex flex-col`}>
            <div className={`w-full h-2/3  flex flex-row ml-auto`}>
              <div
                className={`w-3/4 h-full  flex flex-col text-end justify-center`}
              >
                <Typography variant="h4" color="white" className="font-poppins">
                  {patients.doctor_assigned
                    ? patients.doctor_assigned
                    : "Doctor not assigned"}
                </Typography>
                {/* <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography> */}
              </div>
              <div className={`w-1/4 h-full  flex justify-center items-center`}>
                <Avatar
                  size="xl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
            </div>

            <div className={`w-full h-1/3  flex ml-auto`}>
              <div className={`w-3/4 flex ml-auto justify-center items-center`}>
                <Select
                  label="Doctors Available to Check"
                  className="bg-white rounded-lg font-poppins"
                  // value={selectedDoctor}
                  onChange={handleSelectedDoctorChange}
                >
                  {users.map((user, index) => (
                    <Option key={index} value={`${user._id},${user.name}`}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            {showDateTimePicker && (
              <div className={`w-5/6 h-1/3  flex ml-auto`}>
                <div
                  className={`w-3/4 flex ml-auto justify-center items-center`}
                >
                  {/* Date Calendar */}
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="bg-white rounded-lg font-poppins"
                  />
                  {/* Time Picker */}
                  <TimePicker
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="bg-white rounded-lg ml-2 font-poppins"
                  />
                </div>
              </div>
            )}
            <div className="mt-2 ml-auto">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins"
                onClick={handleButtonClick}
              >
                {showDateTimePicker
                  ? "Hide Date & Time Picker"
                  : "Show Date & Time Picker"}
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 500 && (
        <div
          className={`w-full  rounded-b-3xl flex flex-col  bg-gradient-to-r from-cyan-200 to-cyan-400 py-2 h-[40rem]`}
        >
          <div
            className={`w-full h-[5rem] px-8  flex flex-col items-center justify-center`}
          >
            <ArrowUturnLeftIcon className="w-12 h-12" onClick={onDashboard} />
            <Typography
              variant="h5"
              color="white"
              onClick={onDashboard}
              className="font-poppins"
            >
              Back to Dashboard
            </Typography>
          </div>
          <div className={`w-full h-[17.5rem] px-8 `}>
            <div
              className={`w-full h-full flex flex-col justify-center items-center`}
            >
              <div className={`w-full h-full flex items-center justify-center`}>
                <Avatar
                  size="xxl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-full h-full  text-center flex flex-col justify-center`}
              >
                <Typography variant="h5" color="white" className="font-poppins">
                  {patients.user_id}
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  32 , {patientDetails.Gender}
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  ID: 123456
                </Typography>
                <Typography
                  variant="h7"
                  color="white"
                  className="font-medium font-poppins"
                >
                  {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
            </div>
          </div>

          <div
            className={`w-full h-[17.5rem] px-8  flex flex-col items-center justify-center`}
          >
            <div
              className={`w-full h-2/3  flex flex-col justify-center items-center `}
            >
              <div
                className={`w-full h-full  flex justify-center items-center`}
              >
                <Avatar
                  size="xl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-full h-full  flex flex-col text-center justify-center`}
              >
                <Typography variant="h4" color="white" className="font-poppins">
                  {patients.doctor_assigned
                    ? patients.doctor_assigned
                    : "Doctor not assigned"}
                </Typography>
                {/* <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography> */}
              </div>
            </div>

            <div className={`w-full h-1/3 flex justify-center `}>
              <div className={`w-full flex  justify-center items-center`}>
                <Select
                  label="Doctors Available to Check"
                  className="bg-white rounded-lg font-poppins"
                  value={selectedDoctor}
                  onChange={handleSelectedDoctorChange}
                >
                  {users.map((user, index) => (
                    <Option key={index} value={`${user._id},${user.name}`}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            {showDateTimePicker && (
              <div className={`w-5/6 h-1/3  flex ml-auto`}>
                <div
                  className={`w-3/4 flex ml-auto justify-center items-center`}
                >
                  {/* Date Calendar */}
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="bg-white rounded-lg font-poppins"
                  />
                  {/* Time Picker */}
                  <TimePicker
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="bg-white rounded-lg ml-2 font-poppins"
                  />
                </div>
              </div>
            )}
            <div className="mt-2 ml-auto">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins"
                onClick={handleButtonClick}
              >
                {showDateTimePicker
                  ? "Hide Date & Time Picker"
                  : "Show Date & Time Picker"}
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`w-full   ${
          screenWidth < 1180 ? "h-4/5 flex flex-col" : "h-4/5 flex flex-row"
        }`}
      >
        <div className={`h-full ${screenWidth < 1180 ? "w-full" : "w-1/2"}`}>
          <div className={`w-full h-2/6  py-2 px-3`}>
            <Card
              color="transparent"
              shadow={true}
              className="w-full h-full bg-white flex flex-col pt-2"
            >
              <Typography
                variant="h6"
                color="black"
                className="flex text-start px-8 font-poppins"
              >
                Pain Score
              </Typography>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="pv" fill="#435fe2" shape={<CustomBar />} />
                    <Bar dataKey="uv" fill="#e28743" shape={<CustomBar1 />} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className={`w-full h-2/6 bg-gray-200 py-2 px-3`}>
            <Card
              color="transparent"
              shadow={true}
              className="w-full h-full bg-white flex flex-col pt-2"
            >
              <Typography
                variant="h6"
                color="black"
                className="flex text-start px-8 font-poppins"
              >
                Pain Score
              </Typography>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={500}
                    height={300}
                    data={data1}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stackId="1"
                      stroke="#e29743"
                      fill="#e29743"
                      strokeWidth={0}
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stackId="1"
                      stroke="#efa1f1"
                      fill="#efa1f1"
                      strokeWidth={0}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className={`w-full h-2/6  flex flex-row gap-4 px-3 py-2`}>
            <div className={`w-2/3 h-full`}>
              <Card className="bg-white w-full h-full flex flex-col p-2">
                <div className="h-1/4 flex flex-row justify-between items-center">
                  <Typography
                    variant="h6"
                    color="black"
                    className="text-start text-sm font-poppins"
                  >
                    ROM
                  </Typography>
                  <Typography
                    variant="h7"
                    color="black"
                    className="text-start text-sm font-poppins"
                  >
                    Left Leg
                  </Typography>
                </div>
                <div className="flex flex-col justify-center items-center h-3/4">
                  <CircularProgressbar
                    value={75}
                    text={75}
                    circleRatio={0.75}
                    styles={buildStyles({
                      rotation: 1 / 2 + 1 / 8,
                      trailColor: "#eee",
                      pathColor: "red",
                      textColor: "black",
                      textSize: "22px",
                    })}
                  />
                </div>
              </Card>
            </div>

            <div className={`w-2/3 h-full`}>
              <Card className="bg-white w-full h-full flex flex-col p-2">
                <div className="h-1/4 flex flex-row justify-between items-center">
                  <Typography
                    variant="h6"
                    color="black"
                    className="text-start text-sm font-poppins"
                  >
                    ROM
                  </Typography>
                  <Typography
                    variant="h7"
                    color="black"
                    className="text-start text-sm font-poppins"
                  >
                    Right Leg
                  </Typography>
                </div>
                <div className="flex flex-col justify-center items-center h-3/4">
                  <CircularProgressbar
                    value={64}
                    text={64}
                    circleRatio={0.75}
                    styles={buildStyles({
                      rotation: 1 / 2 + 1 / 8,
                      trailColor: "#eee",
                      pathColor: "cyan",
                      textColor: "black",
                      textSize: "22px",
                    })}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div
          className={` h-full flex flex-col ${
            screenWidth < 1180 ? "w-full" : "w-1/2"
          }`}
        >
          <div className={`w-full h-1/2 px-2 py-2`}>
            <Card
              color="transparent"
              shadow={true}
              className="w-full h-full bg-white flex flex-col gap-2 pt-2"
            >
              <div className={`w-full flex flex-row`}>
                <div className="w-1/2 flex flex-col">
                  <Typography
                    variant="h7"
                    color="gray"
                    className="flex text-start px-5 font-normal font-poppins"
                  >
                    Sugar Level
                  </Typography>
                  <Typography
                    variant="h5"
                    color="black"
                    className="flex text-start px-5 font-poppins"
                  >
                    220 mg/dl
                  </Typography>
                </div>
                <div className="w-1/2 flex flex-col items-end">
                  <Typography
                    variant="h6"
                    color="black"
                    className="flex text-start px-5 font-semibold font-poppins"
                  >
                    25%
                  </Typography>
                  <Typography
                    variant="h6"
                    color="gray"
                    className="flex text-start px-5 font-poppins"
                  >
                    VS LAST MONTH
                  </Typography>
                </div>
              </div>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={500}
                    height={400}
                    data={data2}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="red" stopOpacity={0.5} />
                        <stop
                          offset="95%"
                          stopColor="transparent"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray={"10 5"} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      dataKey="uv"
                      stroke="red"
                      strokeWidth={2}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className={`w-full h-1/2 px-2 py-2`}>
            <Card
              color="transparent"
              shadow={true}
              className="w-full h-full bg-white flex flex-col pt-2"
            >
              <Typography
                variant="h6"
                color="black"
                className="flex text-start px-5 font-poppins"
              >
                Patient Analytics
              </Typography>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={700}
                    height={700}
                    data={data5}
                    margin={{
                      top: 10,
                      right: 30,
                      left: -10,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      strokeWidth={4}
                      strokeDasharray={"25 4"}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke="#82ca9d"
                      strokeWidth={4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
