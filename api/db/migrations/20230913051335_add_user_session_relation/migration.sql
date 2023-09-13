-- CreateTable
CREATE TABLE "_SessionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SessionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SessionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_SessionToUser_AB_unique" ON "_SessionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SessionToUser_B_index" ON "_SessionToUser"("B");
