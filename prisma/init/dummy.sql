-- ============================================================================
-- DUMMY.SQL - Realistic Test Data for Development
-- ============================================================================
-- This file contains realistic user data for testing and development.
-- Run this AFTER setup.sql to populate the database with sample users,
-- deceased records, reservations, and active plots.
--
-- Purpose: Provide realistic test data for development and testing
-- Usage: psql $DATABASE_URL -f prisma/init/dummy.sql
-- ============================================================================

-- ============================================================================
-- 1. USERS (Responsible Parties / Penanggung Jawab)
-- ============================================================================
INSERT INTO "User" (id, name, contact, email, "ktpNum", "emergencyName", "emergencyContact") VALUES
('user-001', 'Agus Wijaya', '081234567801', 'agus.wijaya@email.com', '3201012345670001', 'Rina Wijaya', '081234567802'),
('user-002', 'Bambang Hermanto', '081234567803', 'bambang.h@email.com', '3201012345670002', 'Sari Hermanto', '081234567804'),
('user-003', 'Citra Dewi', '081234567805', 'citra.dewi@email.com', '3201012345670003', 'Dedi Kusuma', '081234567806'),
('user-004', 'Dian Pratama', '081234567807', 'dian.pratama@email.com', '3201012345670004', 'Eka Pratama', '081234567808'),
('user-005', 'Eko Saputra', '081234567809', 'eko.saputra@email.com', '3201012345670005', 'Fitri Saputra', '081234567810'),
('user-006', 'Fajar Nugroho', '081234567811', 'fajar.n@email.com', '3201012345670006', 'Gita Nugroho', '081234567812'),
('user-007', 'Hendra Gunawan', '081234567813', 'hendra.g@email.com', '3201012345670007', 'Indah Gunawan', '081234567814'),
('user-008', 'Irma Suryani', '081234567815', 'irma.suryani@email.com', '3201012345670008', 'Joko Suryani', '081234567816');

-- ============================================================================
-- 2. PENANGGUNG JAWAB (Link Users to Responsible Party Role)
-- ============================================================================
INSERT INTO "PenanggungJawab" (id, "userId") VALUES
('pj-001', 'user-001'),
('pj-002', 'user-002'),
('pj-003', 'user-003'),
('pj-004', 'user-004'),
('pj-005', 'user-005'),
('pj-006', 'user-006');

-- ============================================================================
-- 3. JENAZAH (Deceased Records)
-- ============================================================================
-- Active plots (already buried)
INSERT INTO "Jenazah" (
    id, 
    "tanggalPemakaman", 
    "statusJenazah", 
    "masaAktif", 
    "statusPembayaranPesanan", 
    "statusPembayaranIuranTahunan",
    "userId",
    "blokId"
) VALUES
('jenazah-001', '2024-01-15', 'DIKUBURKAN', '2025-01-15', 'LUNAS', 'LUNAS', 'user-001', 'KU-1'),
('jenazah-002', '2024-03-20', 'DIKUBURKAN', '2025-03-20', 'LUNAS', 'LUNAS', 'user-002', 'KU-2'),
('jenazah-003', '2024-06-10', 'DIKUBURKAN', '2025-06-10', 'LUNAS', 'BELUM LUNAS', 'user-003', 'KU-3');

-- Reserved plots (not yet buried)
INSERT INTO "Jenazah" (
    id, 
    "tanggalPemakaman", 
    "statusJenazah", 
    "masaAktif", 
    "statusPembayaranPesanan", 
    "statusPembayaranIuranTahunan",
    "userId",
    "blokId"
) VALUES
('jenazah-004', NULL, 'DIPESAN', NULL, 'BELUM LUNAS', NULL, 'user-004', 'KU-4'),
('jenazah-005', NULL, 'DIPESAN', NULL, 'LUNAS', NULL, 'user-005', 'KU-5'),
('jenazah-006', NULL, 'DIPESAN', NULL, 'MENUNGGU PERSETUJUAN', NULL, 'user-006', 'KU-6');

-- ============================================================================
-- 4. MAKAM (Active Plots - Already Buried)
-- ============================================================================
INSERT INTO "Makam" (
    id,
    description,
    "tanggalPemesanan",
    "jenazahId",
    "blokId"
) VALUES
('makam-001', 'Makam Bapak Sukarno (Alm)', '2024-01-10', 'jenazah-001', 'KU-1'),
('makam-002', 'Makam Ibu Kartini (Almh)', '2024-03-15', 'jenazah-002', 'KU-2'),
('makam-003', 'Makam Bapak Hatta (Alm)', '2024-06-05', 'jenazah-003', 'KU-3');

-- Link Penanggung Jawab to Makam
INSERT INTO "_PJ_Makam" ("A", "B") VALUES
('makam-001', 'pj-001'),
('makam-002', 'pj-002'),
('makam-003', 'pj-003');

-- Update Blok status for active plots
UPDATE "Blok" SET 
    "statusBlok" = 'DIGUNAKAN-1',
    "availability" = 'TERSEDIA',
    "statusPesanan" = 'TIDAK DIPESAN',
    "tanggalPemakamanTerakhir" = '2024-01-15'
WHERE id = 'KU-1';

UPDATE "Blok" SET 
    "statusBlok" = 'DIGUNAKAN-1',
    "availability" = 'TERSEDIA',
    "statusPesanan" = 'TIDAK DIPESAN',
    "tanggalPemakamanTerakhir" = '2024-03-20'
WHERE id = 'KU-2';

UPDATE "Blok" SET 
    "statusBlok" = 'DIGUNAKAN-1',
    "availability" = 'TERSEDIA',
    "statusPesanan" = 'TIDAK DIPESAN',
    "tanggalPemakamanTerakhir" = '2024-06-10'
WHERE id = 'KU-3';

-- ============================================================================
-- 5. MAKAM STATUS (Reserved Plots - Not Yet Buried)
-- ============================================================================
INSERT INTO "MakamStatus" (
    id,
    description,
    "tanggalPemesanan",
    "jenazahId",
    "blokId"
) VALUES
('status-001', 'Pesanan untuk Bapak Ahmad', '2024-11-01', 'jenazah-004', 'KU-4'),
('status-002', 'Pesanan untuk Ibu Siti', '2024-11-15', 'jenazah-005', 'KU-5'),
('status-003', 'Pesanan untuk Bapak Budi', '2024-12-01', 'jenazah-006', 'KU-6');

-- Link Penanggung Jawab to MakamStatus
INSERT INTO "_PJ_MakamStatus" ("A", "B") VALUES
('status-001', 'pj-004'),
('status-002', 'pj-005'),
('status-003', 'pj-006');

-- Update Blok status for reserved plots
UPDATE "Blok" SET 
    "statusBlok" = 'KOSONG',
    "availability" = 'TIDAK TERSEDIA',
    "statusPesanan" = 'DIPESAN'
WHERE id IN ('KU-4', 'KU-5', 'KU-6');

-- ============================================================================
-- 6. RELASI ORANG (User Relationships)
-- ============================================================================
INSERT INTO "RelasiOrang" ("orang1Id", "orang2Id", "jenisHubungan") VALUES
('user-001', 'user-002', 'SAUDARA'),
('user-003', 'user-004', 'SUAMI_ISTRI'),
('user-005', 'user-006', 'ANAK_ORANG_TUA');

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- This dummy data includes:
-- - 8 Users (potential responsible parties)
-- - 6 Penanggung Jawab (active responsible parties)
-- - 6 Jenazah records (3 buried, 3 reserved)
-- - 3 Active Makam (plots with buried deceased)
-- - 3 MakamStatus (reserved plots awaiting burial)
-- - 3 User relationships
-- - Updated Blok statuses to reflect occupancy
--
-- Note: Admin, Approver, and Pengawas accounts should be created through
-- the application's registration endpoints with proper bcrypt hashing.
-- ============================================================================
