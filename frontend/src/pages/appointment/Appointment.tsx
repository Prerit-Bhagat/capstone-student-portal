import { DashboardLayout } from "../../layout/AppLayout";
import { Card, CardContent } from "../../components/ui/card";
import Button from "../../components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/userContext";
import Calendar from "../../components/ui/calendar";

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const [availability, setAvailability] = useState<any[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<any>({});
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  useEffect(() => {
    setDoctors([
      {
        id: "68ed964eea8f55dc0ad7a93e",
        name: "Dr. Aman Arora",
        specialization: "General Medicine",
      },
      {
        id: "68ed964eea8f55dc0ad7a93f",
        name: "Dr. Suman Sharma",
        specialization: "General Medicine",
      },
    ]);
  }, []);

  useEffect(() => {
    if (!selectedDoctor) return;

    fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/availability/get-availability/${selectedDoctor}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => setAvailability(data))
      .catch((err) => console.error(err));
  }, [selectedDoctor]);

  const generateSlots = (start: string, end: string) => {
    const slots = [];
    let current = new Date(start);
    const finish = new Date(end);

    while (current < finish) {
      const next = new Date(current.getTime() + 30 * 60000);

      slots.push({
        start: new Date(current),
        end: new Date(next),
      });

      current = next;
    }

    return slots;
  };

  const handleBook = async () => {
    if (!selectedDoctor || selectedDates.length === 0) {
      alert("Please select doctor and at least one date.");
      return;
    }

    for (const d of selectedDates) {
      const key = d.toDateString();
      if (!selectedSlots[key]) {
        alert("Please choose a time slot for each selected date.");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = selectedDates.map((d) => {
        const key = d.toDateString();
        const slot = selectedSlots[key];

        return {
          doctorId: selectedDoctor,
          appointmentStartTime: slot.start.toISOString(),
          appointmentEndTime: slot.end.toISOString(),
          reason,
        };
      });

      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/appointment/book-appointment/bulk`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointments: payload }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      alert("All appointments booked successfully!");

      setSelectedDates([]);
      setSelectedSlots({});
      setReason("");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error booking appointments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Appointment">
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        {/* Doctors List */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex justify-between items-center p-4 sm:p-6 w-full hover:bg-gray-50 transition-colors">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Select Doctor
              </h2>
              <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="space-y-2 sm:space-y-3">
                  {doctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctor(doc.id);
                        setSelectedDates([]);
                        setSelectedSlots({});
                      }}
                      className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedDoctor === doc.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            {selectedDoctor === doc.id && (
                              <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 flex-shrink-0" />
                            )}
                            <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                              {doc.name}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            {doc.specialization}
                          </p>
                        </div>
                        <div
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                            selectedDoctor === doc.id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                        >
                          {selectedDoctor === doc.id ? "Selected" : "Select"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Calendar + slots */}
        {selectedDoctor && (
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex justify-between items-center p-4 sm:p-6 w-full hover:bg-gray-50 transition-colors">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Select Dates & Times
                </h2>
                <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
                  {/* Calendar */}
                  <Calendar
                    selectedDates={selectedDates}
                    onSelect={setSelectedDates}
                    maxSelections={3}
                  />

                  {/* For each selected date → show slot buttons */}
                  {selectedDates.map((date) => {
                    const key = date.toDateString();

                    const filtered = availability.filter((a) => {
                      const d = new Date(a.startTime);
                      return d.toDateString() === date.toDateString();
                    });

                    return (
                      <div
                        key={key}
                        className="border border-gray-200 p-3 sm:p-6 rounded-lg bg-gray-50"
                      >
                        <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">
                          📅 Time slots for {date.toDateString()}
                        </h3>

                        {filtered.length === 0 ? (
                          <p className="text-gray-500 text-xs sm:text-sm">
                            No availability for this date.
                          </p>
                        ) : (
                          filtered.map((a) => {
                            const slots = generateSlots(a.startTime, a.endTime);

                            return (
                              <div
                                key={a._id}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3"
                              >
                                {slots.map((slot, idx) => {
                                  const isSelected =
                                    selectedSlots[key] === slot;

                                  return (
                                    <button
                                      key={idx}
                                      onClick={() =>
                                        setSelectedSlots((prev: any) => ({
                                          ...prev,
                                          [key]: slot,
                                        }))
                                      }
                                      className={`py-2 px-2 rounded-lg font-medium text-xs transition-all duration-200 transform hover:scale-105 ${
                                        isSelected
                                          ? "bg-blue-600 text-white shadow-md scale-105"
                                          : "bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:text-blue-600"
                                      }`}
                                    >
                                      {slot.start.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </button>
                                  );
                                })}
                              </div>
                            );
                          })
                        )}
                      </div>
                    );
                  })}

                  {/* Reason */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                      Reason for Visit
                    </label>
                    <textarea
                      className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Please describe the reason for your appointment..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}

        {/* Book Button */}
        <div className="flex justify-end pt-2 sm:pt-4 px-4 sm:px-0">
          <button
            disabled={loading || selectedDates.length === 0}
            onClick={handleBook}
            className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base text-white transition-all duration-200 transform ${
              loading || selectedDates.length === 0
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block animate-spin">⏳</span>
                Booking...
              </span>
            ) : (
              "Book Appointment"
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
// // // import { DashboardLayout } from "../../layout/AppLayout";
// // // import { Card, CardContent } from "../../components/ui/card";
// // // import Button from "../../components/ui/Button";
// // // import {
// // //   Collapsible,
// // //   CollapsibleContent,
// // //   CollapsibleTrigger,
// // // } from "../../components/ui/collapsible";
// // // import { ChevronRight, ChevronDown } from "lucide-react";
// // // import { useState } from "react";
// // // import React, { useEffect } from "react";
// // // import { User } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useUser } from "../../store/userContext";

// // // export default function AppointmentPage() {
// // //   const [doctorsExpanded, setDoctorsExpanded] = useState(true);
// // //   const [bookingExpanded, setBookingExpanded] = useState(false);
// // //   const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
// // //   const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
// // //   const [reason, setReason] = useState<string>("");
// // //   const [loading, setLoading] = useState(false);

// // //   const doctors = [
// // //     {
// // //       id: "1",
// // //       name: "Dr. Suman Sharma",
// // //       startTime: "06/09/2025 11:45 AM",
// // //       endTime: "06/09/2025 11:45 PM",
// // //       specialization: "General Medicine",
// // //     },
// // //     {
// // //       id: "2",
// // //       name: "Dr. Aman Arora",
// // //       startTime: "07/09/2025 09:00 AM",
// // //       endTime: "07/09/2025 05:00 PM",
// // //       specialization: "General Medicine",
// // //     },
// // //   ];

// // //   const generateTimeSlots = () => {
// // //     const slots = [];
// // //     for (let hour = 9; hour <= 17; hour++) {
// // //       slots.push(`${hour.toString().padStart(2, "0")}:00`);
// // //       if (hour < 17) {
// // //         slots.push(`${hour.toString().padStart(2, "0")}:30`);
// // //       }
// // //     }
// // //     return slots;
// // //   };

// // //   const timeSlots = generateTimeSlots();

// // //   const handleBookAppointment = async () => {
// // //     if (!selectedDoctor || !selectedTimeSlot) {
// // //       alert("Please select a doctor and time slot");
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);

// // //       const response = await fetch("/api/appointments", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           doctorId: selectedDoctor,
// // //           timeSlot: selectedTimeSlot,
// // //           reason,
// // //         }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Failed to book appointment");
// // //       }

// // //       const data = await response.json();
// // //       alert(`✅ Appointment booked successfully!\n\nID: ${data.id}`);

// // //       // reset
// // //       setSelectedDoctor(null);
// // //       setSelectedTimeSlot(null);
// // //       setReason("");
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert("❌ Error booking appointment. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const { user, logout } = useUser();
// // //   const navigate = useNavigate();
// // //   // Redirect to login if not logged in
// // //   useEffect(() => {
// // //     if (!user) {
// // //       navigate("/auth");
// // //     }
// // //   }, [user, navigate]);

// // //   return (
// // //     <DashboardLayout title="Appointment">
// // //       <div className="space-y-6">
// // //         {/* Doctors Available Section */}
// // //         <Card>
// // //           <Collapsible open={doctorsExpanded} onOpenChange={setDoctorsExpanded}>
// // //             <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left">
// // //               <h2 className="text-lg font-semibold text-gray-900">
// // //                 Doctors Available
// // //               </h2>
// // //               {doctorsExpanded ? (
// // //                 <ChevronDown className="h-5 w-5 text-gray-500" />
// // //               ) : (
// // //                 <ChevronRight className="h-5 w-5 text-gray-500" />
// // //               )}
// // //             </CollapsibleTrigger>
// // //             <CollapsibleContent>
// // //               <CardContent className="pt-0">
// // //                 <div className="overflow-hidden rounded-lg border">
// // //                   <table className="w-full">
// // //                     <thead className="bg-gray-50">
// // //                       <tr>
// // //                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                           Sr. No.
// // //                         </th>
// // //                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                           Doctor
// // //                         </th>
// // //                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                           Start Time
// // //                         </th>
// // //                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                           Finish Time
// // //                         </th>
// // //                         <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                           Action
// // //                         </th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody className="divide-y divide-gray-200 bg-white">
// // //                       {doctors.map((doctor, index) => (
// // //                         <tr key={doctor.id} className="hover:bg-gray-50">
// // //                           <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
// // //                             {index + 1}
// // //                           </td>
// // //                           <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
// // //                             {doctor.name}
// // //                           </td>
// // //                           <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
// // //                             {doctor.startTime}
// // //                           </td>
// // //                           <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
// // //                             {doctor.endTime}
// // //                           </td>
// // //                           <td className="whitespace-nowrap px-6 py-4 text-sm">
// // //                             <Button
// // //                               variant={
// // //                                 selectedDoctor === doctor.id
// // //                                   ? "default"
// // //                                   : "outline"
// // //                               }
// // //                               size="sm"
// // //                               onClick={() => setSelectedDoctor(doctor.id)}
// // //                             >
// // //                               {selectedDoctor === doctor.id
// // //                                 ? "Selected"
// // //                                 : "Select"}
// // //                             </Button>
// // //                           </td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>
// // //               </CardContent>
// // //             </CollapsibleContent>
// // //           </Collapsible>
// // //         </Card>

// // //         {/* Book Slot Section */}
// // //         <Card>
// // //           <Collapsible open={bookingExpanded} onOpenChange={setBookingExpanded}>
// // //             <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left">
// // //               <h2 className="text-lg font-semibold text-gray-900">Book Slot</h2>
// // //               {bookingExpanded ? (
// // //                 <ChevronDown className="h-5 w-5 text-gray-500" />
// // //               ) : (
// // //                 <ChevronRight className="h-5 w-5 text-gray-500" />
// // //               )}
// // //             </CollapsibleTrigger>
// // //             <CollapsibleContent>
// // //               <CardContent className="pt-0">
// // //                 <div className="space-y-6">
// // //                   {selectedDoctor && (
// // //                     <div>
// // //                       <h3 className="mb-3 text-sm font-medium text-gray-700">
// // //                         Selected Doctor:{" "}
// // //                         {doctors.find((d) => d.id === selectedDoctor)?.name}
// // //                       </h3>
// // //                     </div>
// // //                   )}

// // //                   <div>
// // //                     <label className="mb-3 block text-sm font-medium text-gray-700">
// // //                       Select Time Slot
// // //                     </label>
// // //                     <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
// // //                       {timeSlots.map((slot) => (
// // //                         <Button
// // //                           key={slot}
// // //                           variant={
// // //                             selectedTimeSlot === slot ? "default" : "outline"
// // //                           }
// // //                           size="sm"
// // //                           onClick={() => setSelectedTimeSlot(slot)}
// // //                           className="text-xs"
// // //                         >
// // //                           {slot}
// // //                         </Button>
// // //                       ))}
// // //                     </div>
// // //                   </div>

// // //                   <div>
// // //                     <label className="mb-2 block text-sm font-medium text-gray-700">
// // //                       Reason for Visit (Optional)
// // //                     </label>
// // //                     <textarea
// // //                       value={reason}
// // //                       onChange={(e) => setReason(e.target.value)}
// // //                       className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
// // //                       rows={3}
// // //                       placeholder="Describe your symptoms or reason for the appointment..."
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </CollapsibleContent>
// // //           </Collapsible>
// // //         </Card>

// // //         {/* Book Slot Button */}
// // //         <div className="flex justify-end">
// // //           <Button
// // //             onClick={handleBookAppointment}
// // //             className="bg-blue-600 px-8 py-2 hover:bg-blue-700"
// // //             disabled={!selectedDoctor || !selectedTimeSlot || loading}
// // //           >
// // //             {loading ? "Booking..." : "Book Slot"}
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </DashboardLayout>
// // //   );
// // // }
// // import { DashboardLayout } from "../../layout/AppLayout";
// // import { Card, CardContent } from "../../components/ui/card";
// // import Button from "../../components/ui/Button";
// // import {
// //   Collapsible,
// //   CollapsibleContent,
// //   CollapsibleTrigger,
// // } from "../../components/ui/collapsible";
// // import { ChevronRight, ChevronDown } from "lucide-react";
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useUser } from "../../store/userContext";

// // export default function AppointmentPage() {
// //   const [doctors, setDoctors] = useState<any[]>([]);
// //   const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
// //   const [availability, setAvailability] = useState<any[]>([]);
// //   const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
// //   const [reason, setReason] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const { user } = useUser();
// //   const navigate = useNavigate();

// //   // Redirect if not logged in
// //   useEffect(() => {
// //     if (!user) navigate("/auth");
// //   }, [user]);

// //   // Fetch doctors (STATIC FOR NOW — you can replace with API later)
// //   useEffect(() => {
// //     setDoctors([
// //       {
// //         id: "68ed964eea8f55dc0ad7a93e",
// //         name: "Dr. Aman Arora",
// //         specialization: "General Medicine",
// //       },
// //       {
// //         id: "68ed964eea8f55dc0ad7a93f",
// //         name: "Dr. Suman Sharma",
// //         specialization: "General Medicine",
// //       },
// //     ]);
// //   }, []);

// //   // Fetch availability when doctor selected
// //   useEffect(() => {
// //     if (!selectedDoctor) return;

// //     fetch(
// //       `${
// //         import.meta.env.VITE_SERVER_URL
// //       }/api/availability/get-availability/${selectedDoctor}`,
// //       { credentials: "include" }
// //     )
// //       .then((res) => res.json())
// //       .then((data) => setAvailability(data))
// //       .catch((err) => console.error(err));
// //   }, [selectedDoctor]);

// //   // Convert backend availability range → time slots of 30 min
// //   const generateSlots = (start: string, end: string) => {
// //     const slots = [];
// //     let current = new Date(start);
// //     const finish = new Date(end);

// //     while (current < finish) {
// //       const next = new Date(current.getTime() + 30 * 60000);

// //       slots.push({
// //         start: new Date(current),
// //         end: new Date(next),
// //       });

// //       current = next;
// //     }

// //     return slots;
// //   };

// //   // BOOK APPOINTMENT
// //   const handleBook = async () => {
// //     if (!selectedDoctor || !selectedSlot) {
// //       alert("Please select a doctor and time slot");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         `${import.meta.env.VITE_SERVER_URL}/api/appointment/book-appointment`,
// //         {
// //           method: "POST",
// //           credentials: "include",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             doctorId: selectedDoctor,
// //             appointmentStartTime: selectedSlot.start.toISOString(),
// //             appointmentEndTime: selectedSlot.end.toISOString(),
// //             reason,
// //           }),
// //         }
// //       );

// //       const data = await response.json();

// //       if (!response.ok) throw new Error(data.message || "Failed");

// //       alert(`Appointment booked! ID: ${data._id}`);
// //       setSelectedDoctor(null);
// //       setSelectedSlot(null);
// //       setReason("");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error booking appointment");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <DashboardLayout title="Appointment">
// //       <div className="space-y-6">
// //         {/* Doctors List */}
// //         <Card>
// //           <Collapsible defaultOpen>
// //             <CollapsibleTrigger className="flex justify-between p-6">
// //               <h2 className="text-lg font-semibold">Doctors</h2>
// //               <ChevronDown className="w-5 h-5" />
// //             </CollapsibleTrigger>
// //             <CollapsibleContent>
// //               <CardContent>
// //                 <table className="w-full border">
// //                   <thead>
// //                     <tr className="bg-gray-50">
// //                       <th className="p-3 text-left">Name</th>
// //                       <th className="p-3 text-left">Specialization</th>
// //                       <th className="p-3 text-left">Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {doctors.map((doc) => (
// //                       <tr key={doc.id} className="border-t">
// //                         <td className="p-3">{doc.name}</td>
// //                         <td className="p-3">{doc.specialization}</td>
// //                         <td className="p-3">
// //                           <Button
// //                             variant={
// //                               selectedDoctor === doc.id ? "default" : "outline"
// //                             }
// //                             onClick={() => {
// //                               setSelectedDoctor(doc.id);
// //                               setSelectedSlot(null);
// //                             }}
// //                           >
// //                             {selectedDoctor === doc.id ? "Selected" : "Select"}
// //                           </Button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </CardContent>
// //             </CollapsibleContent>
// //           </Collapsible>
// //         </Card>

// //         {/* Availability Slots */}
// //         {selectedDoctor && (
// //           <Card>
// //             <Collapsible defaultOpen>
// //               <CollapsibleTrigger className="flex justify-between p-6">
// //                 <h2 className="text-lg font-semibold">Available Time Slots</h2>
// //                 <ChevronDown className="w-5 h-5" />
// //               </CollapsibleTrigger>
// //               <CollapsibleContent>
// //                 <CardContent>
// //                   {availability.length === 0 ? (
// //                     <p className="text-gray-500">No availability found.</p>
// //                   ) : (
// //                     availability.map((a) => {
// //                       const slots = generateSlots(a.startTime, a.endTime);
// //                       return (
// //                         <div key={a._id} className="mb-6">
// //                           <p className="text-sm text-gray-600 mb-2">
// //                             {new Date(a.startTime).toLocaleString()} →{" "}
// //                             {new Date(a.endTime).toLocaleString()}
// //                           </p>

// //                           <div className="grid grid-cols-4 gap-3">
// //                             {slots.map((slot, index) => (
// //                               <Button
// //                                 key={index}
// //                                 variant={
// //                                   selectedSlot === slot ? "default" : "outline"
// //                                 }
// //                                 onClick={() => setSelectedSlot(slot)}
// //                                 className="text-xs"
// //                               >
// //                                 {slot.start.toLocaleTimeString([], {
// //                                   hour: "2-digit",
// //                                   minute: "2-digit",
// //                                 })}
// //                               </Button>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       );
// //                     })
// //                   )}

// //                   {/* Reason */}
// //                   <textarea
// //                     className="w-full border p-2 rounded mt-4"
// //                     placeholder="Reason for visit"
// //                     value={reason}
// //                     onChange={(e) => setReason(e.target.value)}
// //                   />
// //                 </CardContent>
// //               </CollapsibleContent>
// //             </Collapsible>
// //           </Card>
// //         )}

// //         {/* Book Button */}
// //         <div className="flex justify-end">
// //           <Button
// //             disabled={!selectedSlot || loading}
// //             onClick={handleBook}
// //             className="px-8 bg-blue-600 text-white"
// //           >
// //             {loading ? "Booking..." : "Book Appointment"}
// //           </Button>
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // }
// import { DashboardLayout } from "../../layout/AppLayout";
// import { Card, CardContent } from "../../components/ui/card";
// import Button from "../../components/ui/Button";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "../../components/ui/collapsible";
// import { ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../../store/userContext";
// import Calendar from "../../components/ui/calendar"; // <-- YOUR CUSTOM CALENDAR

// export default function AppointmentPage() {
//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

//   const [availability, setAvailability] = useState<any[]>([]);
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]);
//   const [selectedSlots, setSelectedSlots] = useState<any>({});
//   const [reason, setReason] = useState("");

//   const [loading, setLoading] = useState(false);
//   const { user } = useUser();
//   const navigate = useNavigate();

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!user) navigate("/auth");
//   }, [user]);

//   // Fetch static doctors
//   useEffect(() => {
//     setDoctors([
//       {
//         id: "68ed964eea8f55dc0ad7a93e",
//         name: "Dr. Aman Arora",
//         specialization: "General Medicine",
//       },
//       {
//         id: "68ed964eea8f55dc0ad7a93f",
//         name: "Dr. Suman Sharma",
//         specialization: "General Medicine",
//       },
//     ]);
//   }, []);

//   // Fetch availability from backend
//   useEffect(() => {
//     if (!selectedDoctor) return;

//     fetch(
//       `${
//         import.meta.env.VITE_SERVER_URL
//       }/api/availability/get-availability/${selectedDoctor}`,
//       { credentials: "include" }
//     )
//       .then((res) => res.json())
//       .then((data) => setAvailability(data))
//       .catch((err) => console.error(err));
//   }, [selectedDoctor]);

//   // Convert backend availability range → 30-min slots
//   const generateSlots = (start: string, end: string) => {
//     const slots = [];
//     let current = new Date(start);
//     const finish = new Date(end);

//     while (current < finish) {
//       const next = new Date(current.getTime() + 30 * 60000);

//       slots.push({
//         start: new Date(current),
//         end: new Date(next),
//       });

//       current = next;
//     }

//     return slots;
//   };

//   // BOOK APPOINTMENT FOR ALL SELECTED DATES
//   const handleBook = async () => {
//     if (!selectedDoctor || selectedDates.length === 0) {
//       alert("Please select doctor and at least one date.");
//       return;
//     }

//     // Ensure each date has a selected slot
//     for (const d of selectedDates) {
//       const key = d.toDateString();
//       if (!selectedSlots[key]) {
//         alert("Please choose a time slot for each selected date.");
//         return;
//       }
//     }

//     setLoading(true);

//     try {
//       const payload = selectedDates.map((d) => {
//         const key = d.toDateString();
//         const slot = selectedSlots[key];

//         return {
//           doctorId: selectedDoctor,
//           appointmentStartTime: slot.start.toISOString(),
//           appointmentEndTime: slot.end.toISOString(),
//           reason,
//         };
//       });

//       const response = await fetch(
//         `${
//           import.meta.env.VITE_SERVER_URL
//         }/api/appointment/book-appointment/bulk`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ appointments: payload }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message);

//       alert("All appointments booked successfully!");

//       // Reset
//       setSelectedDates([]);
//       setSelectedSlots({});
//       setReason("");
//     } catch (err: any) {
//       console.error(err);
//       alert(err.message || "Error booking appointments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout title="Appointment">
//       <div className="space-y-6">
//         {/* Doctors List */}
//         <Card>
//           <Collapsible defaultOpen>
//             <CollapsibleTrigger className="flex justify-between p-6">
//               <h2 className="text-lg font-semibold">Doctors</h2>
//               <ChevronDown className="w-5 h-5" />
//             </CollapsibleTrigger>

//             <CollapsibleContent>
//               <CardContent>
//                 <table className="w-full border">
//                   <thead>
//                     <tr className="bg-gray-50">
//                       <th className="p-3 text-left">Name</th>
//                       <th className="p-3 text-left">Specialization</th>
//                       <th className="p-3 text-left">Action</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {doctors.map((doc) => (
//                       <tr key={doc.id} className="border-t">
//                         <td className="p-3">{doc.name}</td>
//                         <td className="p-3">{doc.specialization}</td>
//                         <td className="p-3">
//                           <Button
//                             variant={
//                               selectedDoctor === doc.id ? "default" : "outline"
//                             }
//                             onClick={() => {
//                               setSelectedDoctor(doc.id);
//                               setSelectedDates([]);
//                               setSelectedSlots({});
//                             }}
//                           >
//                             {selectedDoctor === doc.id ? "Selected" : "Select"}
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </CardContent>
//             </CollapsibleContent>
//           </Collapsible>
//         </Card>

//         {/* Calendar + slots */}
//         {selectedDoctor && (
//           <Card>
//             <Collapsible defaultOpen>
//               <CollapsibleTrigger className="flex justify-between p-6">
//                 <h2 className="text-lg font-semibold">Select Dates</h2>
//                 <ChevronDown className="w-5 h-5" />
//               </CollapsibleTrigger>

//               <CollapsibleContent>
//                 <CardContent className="space-y-6">
//                   {/* Calendar */}
//                   <Calendar
//                     selectedDates={selectedDates}
//                     onSelect={setSelectedDates}
//                     maxSelections={3}
//                   />

//                   {/* For each selected date → show slot buttons */}
//                   {selectedDates.map((date) => {
//                     const key = date.toDateString();

//                     // find availability for that date
//                     const filtered = availability.filter((a) => {
//                       const d = new Date(a.startTime);
//                       return d.toDateString() === date.toDateString();
//                     });

//                     return (
//                       <div key={key} className="mt-4 border p-4 rounded-lg">
//                         <h3 className="font-semibold mb-2">
//                           Slots for {date.toDateString()}
//                         </h3>

//                         {filtered.length === 0 ? (
//                           <p className="text-gray-500">
//                             No availability for this date.
//                           </p>
//                         ) : (
//                           filtered.map((a) => {
//                             const slots = generateSlots(a.startTime, a.endTime);

//                             return (
//                               <div
//                                 key={a._id}
//                                 className="grid grid-cols-4 gap-3 mb-4"
//                               >
//                                 {slots.map((slot, idx) => (
//                                   <Button
//                                     key={idx}
//                                     variant={
//                                       selectedSlots[key] === slot
//                                         ? "default"
//                                         : "outline"
//                                     }
//                                     onClick={() =>
//                                       setSelectedSlots((prev: any) => ({
//                                         ...prev,
//                                         [key]: slot,
//                                       }))
//                                     }
//                                     className="text-xs"
//                                   >
//                                     {slot.start.toLocaleTimeString([], {
//                                       hour: "2-digit",
//                                       minute: "2-digit",
//                                     })}
//                                   </Button>
//                                 ))}
//                               </div>
//                             );
//                           })
//                         )}
//                       </div>
//                     );
//                   })}

//                   {/* Reason */}
//                   <textarea
//                     className="w-full border p-2 rounded mt-4"
//                     placeholder="Reason for visit"
//                     value={reason}
//                     onChange={(e) => setReason(e.target.value)}
//                   />
//                 </CardContent>
//               </CollapsibleContent>
//             </Collapsible>
//           </Card>
//         )}

//         {/* Book Button */}
//         <div className="flex justify-end">
//           <Button
//             disabled={loading || selectedDates.length === 0}
//             onClick={handleBook}
//             className="px-8 bg-blue-600 text-white"
//           >
//             {loading ? "Booking..." : "Book Appointment"}
//           </Button>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
