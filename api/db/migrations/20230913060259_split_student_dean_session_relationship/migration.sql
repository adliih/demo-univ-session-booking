/*
  Warnings:

  - You are about to drop the `_SessionToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deanUserId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentUserId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_SessionToUser_B_index";

-- DropIndex
DROP INDEX "_SessionToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SessionToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "studentUserId" INTEGER NOT NULL,
    "deanUserId" INTEGER NOT NULL,
    CONSTRAINT "Session_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_deanUserId_fkey" FOREIGN KEY ("deanUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("date", "id", "status", "time", "title") SELECT "date", "id", "status", "time", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
