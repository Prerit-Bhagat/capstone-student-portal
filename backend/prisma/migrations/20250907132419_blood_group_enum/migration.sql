/*
  Warnings:

  - Made the column `phone` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dob` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yearOfStudy` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `bloodGroup` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BloodGroup" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- AlterTable
ALTER TABLE "public"."Student" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "dob" SET NOT NULL,
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "yearOfStudy" SET NOT NULL,
DROP COLUMN "bloodGroup",
ADD COLUMN     "bloodGroup" "public"."BloodGroup" NOT NULL;
