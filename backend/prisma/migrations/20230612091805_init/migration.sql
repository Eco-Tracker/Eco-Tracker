-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "bodyCom" TEXT NOT NULL,
    "post_Id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "idEV" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "participants" INTEGER NOT NULL,
    "like" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("idEV")
);

-- CreateTable
CREATE TABLE "personalUser" (
    "id" TEXT NOT NULL,
    "photo" TEXT,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "personalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_Id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "like" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_Id")
);

-- CreateTable
CREATE TABLE "profissionalUser" (
    "id" TEXT NOT NULL,
    "professionalName" TEXT NOT NULL,
    "professionalMail" TEXT NOT NULL,
    "contactNumber" INTEGER NOT NULL,
    "codeFiscal" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "profissionalUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "adminId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "points" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personalUser_mail_key" ON "personalUser"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "profissionalUser_professionalMail_key" ON "profissionalUser"("professionalMail");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "personalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "profissionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "personalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "personalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
