import { DashboardLayout } from "../../layout/AppLayout";
import { Card, CardContent } from "../../components/ui/card";
import Button from "../../components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import React, { useEffect } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/userContext";

export default function AppointmentPage() {
  const [doctorsExpanded, setDoctorsExpanded] = useState(true);
  const [bookingExpanded, setBookingExpanded] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const doctors = [
    {
      id: "1",
      name: "Dr. Suman Sharma",
      startTime: "06/09/2025 11:45 AM",
      endTime: "06/09/2025 11:45 PM",
      specialization: "General Medicine",
    },
    {
      id: "2",
      name: "Dr. Aman Arora",
      startTime: "07/09/2025 09:00 AM",
      endTime: "07/09/2025 05:00 PM",
      specialization: "General Medicine",
    },
  ];

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedTimeSlot) {
      alert("Please select a doctor and time slot");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          timeSlot: selectedTimeSlot,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      const data = await response.json();
      alert(`✅ Appointment booked successfully!\n\nID: ${data.id}`);

      // reset
      setSelectedDoctor(null);
      setSelectedTimeSlot(null);
      setReason("");
    } catch (error) {
      console.error(error);
      alert("❌ Error booking appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { user, logout } = useUser();
  const navigate = useNavigate();
  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <DashboardLayout title="Appointment">
      <div className="space-y-6">
        {/* Doctors Available Section */}
        <Card>
          <Collapsible open={doctorsExpanded} onOpenChange={setDoctorsExpanded}>
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left">
              <h2 className="text-lg font-semibold text-gray-900">
                Doctors Available
              </h2>
              {doctorsExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Sr. No.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Doctor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Start Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Finish Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {doctors.map((doctor, index) => (
                        <tr key={doctor.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            {doctor.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            {doctor.startTime}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            {doctor.endTime}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm">
                            <Button
                              variant={
                                selectedDoctor === doctor.id
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => setSelectedDoctor(doctor.id)}
                            >
                              {selectedDoctor === doctor.id
                                ? "Selected"
                                : "Select"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Book Slot Section */}
        <Card>
          <Collapsible open={bookingExpanded} onOpenChange={setBookingExpanded}>
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left">
              <h2 className="text-lg font-semibold text-gray-900">Book Slot</h2>
              {bookingExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-6">
                  {selectedDoctor && (
                    <div>
                      <h3 className="mb-3 text-sm font-medium text-gray-700">
                        Selected Doctor:{" "}
                        {doctors.find((d) => d.id === selectedDoctor)?.name}
                      </h3>
                    </div>
                  )}

                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={
                            selectedTimeSlot === slot ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className="text-xs"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Reason for Visit (Optional)
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={3}
                      placeholder="Describe your symptoms or reason for the appointment..."
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Book Slot Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleBookAppointment}
            className="bg-blue-600 px-8 py-2 hover:bg-blue-700"
            disabled={!selectedDoctor || !selectedTimeSlot || loading}
          >
            {loading ? "Booking..." : "Book Slot"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
