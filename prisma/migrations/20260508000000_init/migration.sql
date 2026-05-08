-- CreateTable
CREATE TABLE IF NOT EXISTS "ContentCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "estimatedMinutes" INTEGER NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "steps" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "UserInteraction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL DEFAULT 'demo-user',
    "type" TEXT NOT NULL,
    "contentCardId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserInteraction_contentCardId_fkey" FOREIGN KEY ("contentCardId") REFERENCES "ContentCard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contentCardId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL DEFAULT 'neutral',
    "tag" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Feedback_contentCardId_fkey" FOREIGN KEY ("contentCardId") REFERENCES "ContentCard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "BugTicket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'medium',
    "status" TEXT NOT NULL DEFAULT 'open',
    "relatedPage" TEXT NOT NULL,
    "githubIssueUrl" TEXT,
    "contentCardId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BugTicket_contentCardId_fkey" FOREIGN KEY ("contentCardId") REFERENCES "ContentCard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "ContentCard_slug_key" ON "ContentCard"("slug");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "UserInteraction_contentCardId_type_idx" ON "UserInteraction"("contentCardId", "type");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "UserInteraction_userId_contentCardId_type_idx" ON "UserInteraction"("userId", "contentCardId", "type");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Feedback_contentCardId_idx" ON "Feedback"("contentCardId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "BugTicket_status_severity_idx" ON "BugTicket"("status", "severity");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "BugTicket_contentCardId_idx" ON "BugTicket"("contentCardId");
