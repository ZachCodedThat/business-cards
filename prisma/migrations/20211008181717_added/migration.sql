/*
  Warnings:

  - Added the required column `cardId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "website" TEXT NOT NULL
);
INSERT INTO "new_Card" ("biography", "email", "github", "id", "name", "phone", "twitter", "website") SELECT "biography", "email", "github", "id", "name", "phone", "twitter", "website" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
