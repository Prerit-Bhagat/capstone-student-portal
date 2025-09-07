/*
  Warnings:

  - You are about to drop the column `roomNumber` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Doctor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" DROP COLUMN "roomNumber",
ADD COLUMN     "gender" "public"."Gender" NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
