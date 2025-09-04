-- DropIndex
DROP INDEX "public"."Appointment_studentId_key";

-- CreateIndex
CREATE INDEX "Appointment_studentId_idx" ON "public"."Appointment"("studentId");

-- CreateIndex
CREATE INDEX "Appointment_doctorId_idx" ON "public"."Appointment"("doctorId");
