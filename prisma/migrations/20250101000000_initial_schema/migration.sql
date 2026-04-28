-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengawas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Pengawas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "contact" TEXT,
    "email" TEXT,
    "ktpNum" CHAR(16),
    "emergencyName" VARCHAR(255),
    "emergencyContact" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelasiOrang" (
    "id" SERIAL NOT NULL,
    "orang1Id" TEXT NOT NULL,
    "orang2Id" TEXT NOT NULL,
    "jenisHubungan" TEXT NOT NULL,

    CONSTRAINT "RelasiOrang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenanggungJawab" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PenanggungJawab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jenazah" (
    "id" TEXT NOT NULL,
    "tanggalPemakaman" TIMESTAMP(3),
    "statusJenazah" VARCHAR(255),
    "masaAktif" TIMESTAMP(3),
    "statusPembayaranPesanan" VARCHAR(255),
    "statusPembayaranIuranTahunan" VARCHAR(255),
    "userId" TEXT,
    "blokId" TEXT,

    CONSTRAINT "Jenazah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blok" (
    "id" TEXT NOT NULL,
    "lokasi" VARCHAR(255),
    "tanggalPemakamanTerakhir" TIMESTAMP(3),
    "statusBlok" VARCHAR(255),
    "statusPesanan" VARCHAR(255),
    "availability" VARCHAR(255),

    CONSTRAINT "Blok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MakamStatus" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tanggalPemesanan" TIMESTAMP(3),
    "jenazahId" TEXT,
    "blokId" TEXT,

    CONSTRAINT "MakamStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Makam" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tanggalPemesanan" TIMESTAMP(3),
    "jenazahId" TEXT,
    "blokId" TEXT,

    CONSTRAINT "Makam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PJ_MakamStatus" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PJ_MakamStatus_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PJ_Makam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PJ_Makam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Approver_email_key" ON "Approver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pengawas_email_key" ON "Pengawas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_ktpNum_key" ON "User"("ktpNum");

-- CreateIndex
CREATE UNIQUE INDEX "RelasiOrang_orang1Id_orang2Id_key" ON "RelasiOrang"("orang1Id", "orang2Id");

-- CreateIndex
CREATE UNIQUE INDEX "PenanggungJawab_userId_key" ON "PenanggungJawab"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Jenazah_userId_key" ON "Jenazah"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MakamStatus_jenazahId_key" ON "MakamStatus"("jenazahId");

-- CreateIndex
CREATE UNIQUE INDEX "Makam_jenazahId_key" ON "Makam"("jenazahId");

-- CreateIndex
CREATE INDEX "_PJ_MakamStatus_B_index" ON "_PJ_MakamStatus"("B");

-- CreateIndex
CREATE INDEX "_PJ_Makam_B_index" ON "_PJ_Makam"("B");

-- AddForeignKey
ALTER TABLE "RelasiOrang" ADD CONSTRAINT "RelasiOrang_orang1Id_fkey" FOREIGN KEY ("orang1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelasiOrang" ADD CONSTRAINT "RelasiOrang_orang2Id_fkey" FOREIGN KEY ("orang2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenanggungJawab" ADD CONSTRAINT "PenanggungJawab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jenazah" ADD CONSTRAINT "Jenazah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jenazah" ADD CONSTRAINT "Jenazah_blokId_fkey" FOREIGN KEY ("blokId") REFERENCES "Blok"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MakamStatus" ADD CONSTRAINT "MakamStatus_jenazahId_fkey" FOREIGN KEY ("jenazahId") REFERENCES "Jenazah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MakamStatus" ADD CONSTRAINT "MakamStatus_blokId_fkey" FOREIGN KEY ("blokId") REFERENCES "Blok"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Makam" ADD CONSTRAINT "Makam_jenazahId_fkey" FOREIGN KEY ("jenazahId") REFERENCES "Jenazah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Makam" ADD CONSTRAINT "Makam_blokId_fkey" FOREIGN KEY ("blokId") REFERENCES "Blok"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PJ_MakamStatus" ADD CONSTRAINT "_PJ_MakamStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "MakamStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PJ_MakamStatus" ADD CONSTRAINT "_PJ_MakamStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "PenanggungJawab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PJ_Makam" ADD CONSTRAINT "_PJ_Makam_A_fkey" FOREIGN KEY ("A") REFERENCES "Makam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PJ_Makam" ADD CONSTRAINT "_PJ_Makam_B_fkey" FOREIGN KEY ("B") REFERENCES "PenanggungJawab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
