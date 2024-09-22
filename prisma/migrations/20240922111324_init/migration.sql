-- CreateTable
CREATE TABLE "Article" (
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("title")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");
