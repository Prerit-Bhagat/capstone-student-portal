"use client";
import { DashboardLayout } from "../../layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Button from "../../components/ui/Button";
import { Badge } from "../../components/ui/badge";
import { Calendar, Download, Eye, FileText, Clock } from "lucide-react";
import { useState } from "react";
import Access from "../../common/access";

export default function PastReportsPage() {
  const [_selectedReport, setSelectedReport] = useState<string | null>(null);

  const pastReports = [
    {
      id: "1",
      date: "2025-01-15",
      doctor: "Dr. Suman Sharma",
      type: "General Checkup",
      diagnosis: "Routine health examination - All parameters normal",
      prescription: "Multivitamin tablets, adequate rest",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: "2",
      date: "2024-12-20",
      doctor: "Dr. Rajesh Gupta",
      type: "Blood Test Report",
      diagnosis: "Mild vitamin D deficiency detected",
      prescription: "Vitamin D3 supplements for 3 months",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: "3",
      date: "2024-11-10",
      doctor: "Dr. Priya Sharma",
      type: "Eye Examination",
      diagnosis: "Minor refractive error - Myopia",
      prescription: "Prescribed corrective lenses",
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: "4",
      date: "2024-10-05",
      doctor: "Dr. Aman Arora",
      type: "Fever Consultation",
      diagnosis: "Viral fever - Recovery expected in 5-7 days",
      prescription: "Paracetamol, rest, adequate fluid intake",
      status: "completed",
      downloadUrl: "#",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewReport = (reportId: string) => {
    setSelectedReport(reportId);
    alert(`Viewing detailed report for ID: ${reportId}`);
  };

  const handleDownloadReport = (reportId: string) => {
    alert(`Downloading report for ID: ${reportId}`);
  };

  return (
    <DashboardLayout title="Past Reports">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pastReports.length}</div>
              <p className="text-xs text-muted-foreground">
                Medical reports available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan 15</div>
              <p className="text-xs text-muted-foreground">
                2025 - General Checkup
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Actions
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                No pending follow-ups
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Reports History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">
                          {report.type}
                        </h3>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>

                      <div className="grid gap-2 text-sm text-gray-600 md:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <strong>Doctor:</strong> {report.doctor}
                        </div>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div>
                          <strong className="text-gray-700">Diagnosis:</strong>
                          <p className="text-gray-600">{report.diagnosis}</p>
                        </div>
                        <div>
                          <strong className="text-gray-700">
                            Prescription:
                          </strong>
                          <p className="text-gray-600">{report.prescription}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReport(report.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pastReports.length === 0 && (
              <div className="py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No reports found
                </h3>
                <p className="mt-2 text-gray-600">
                  Your medical reports will appear here after your appointments.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
