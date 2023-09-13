-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "studentUserId" INTEGER,
    "deanUserId" INTEGER,
    CONSTRAINT "Session_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Session_deanUserId_fkey" FOREIGN KEY ("deanUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("date", "deanUserId", "id", "status", "studentUserId", "time", "title") SELECT "date", "deanUserId", "id", "status", "studentUserId", "time", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
