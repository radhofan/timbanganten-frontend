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
('user-001', 'Agus Wijaya',      '081234567801', 'agus.wijaya@email.com',    '3201012345670001', 'Rina Wijaya',   '081234567802'),
('user-002', 'Bambang Hermanto', '081234567803', 'bambang.h@email.com',      '3201012345670002', 'Sari Hermanto', '081234567804'),
('user-003', 'Citra Dewi',       '081234567805', 'citra.dewi@email.com',     '3201012345670003', 'Dedi Kusuma',   '081234567806'),
('user-004', 'Dian Pratama',     '081234567807', 'dian.pratama@email.com',   '3201012345670004', 'Eka Pratama',   '081234567808'),
('user-005', 'Eko Saputra',      '081234567809', 'eko.saputra@email.com',    '3201012345670005', 'Fitri Saputra', '081234567810'),
('user-006', 'Fajar Nugroho',    '081234567811', 'fajar.n@email.com',        '3201012345670006', 'Gita Nugroho',  '081234567812'),
('user-007', 'Hendra Gunawan',   '081234567813', 'hendra.g@email.com',       '3201012345670007', 'Indah Gunawan', '081234567814'),
('user-008', 'Irma Suryani',     '081234567815', 'irma.suryani@email.com',   '3201012345670008', 'Joko Suryani',  '081234567816');

-- Deceased users (only name needed — no contact/email/KTP required)
INSERT INTO "User" (id, name) VALUES
('user-pb-001', 'Sukarno'),
('user-pb-002', 'Kartini'),
('user-pb-003', 'Hatta'),
('user-pb-004', 'Ahmad Yani'),
('user-pb-005', 'Siti Rahayu'),
('user-pb-006', 'Budi Santoso'),
-- Stacked plot users
('user-pb-007', 'Wahyu Santoso'),
('user-pb-008', 'Dewi Rahayu');

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
-- Active plots (already buried) — masaAktif = tanggalPemakaman + 1 year
-- statusPembayaranPesanan: set to PAID (via bayarPesanan endpoint)
-- statusPembayaranIuranTahunan: set to PAID (via bayarIuranTahunan endpoint)
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
('jenazah-001', '2025-01-15', 'DIKUBURKAN',  '2026-01-15', 'PAID',   'PAID',   'user-pb-001', 'KU-1'),
('jenazah-002', '2025-03-20', 'DIKUBURKAN',  '2026-03-20', 'PAID',   'PAID',   'user-pb-002', 'KU-2'),
('jenazah-003', '2025-06-10', 'DIKUBURKAN',  '2026-06-10', 'PAID',   'UNPAID', 'user-pb-003', 'KU-3'),
-- Stacked plot: two jenazah in KU-5 (DIGUNAKAN-2)
('jenazah-007', '2024-08-10', 'DIKUBURKAN',  '2025-08-10', 'PAID',   'PAID',   'user-pb-007', 'KU-5'),
('jenazah-008', '2025-02-20', 'DITUMPUK-2',  '2026-02-20', 'PAID',   'PAID',   'user-pb-008', 'KU-5');

-- Reserved plots (not yet buried) — masaAktif = tanggalPemesanan + 4 years
-- statusPembayaranPesanan: UNPAID (default on create) or PAID (after bayarPesanan)
-- statusPembayaranIuranTahunan: UNPAID (not applicable until buried)
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
('jenazah-004', NULL, 'DIPESAN', '2029-11-01', 'UNPAID', 'UNPAID', 'user-pb-004', 'KU-4'),
('jenazah-005', NULL, 'DIPESAN', '2029-11-15', 'PAID',   'UNPAID', 'user-pb-005', 'KU-5'),
('jenazah-006', NULL, 'DIPESAN', '2029-12-01', 'UNPAID', 'UNPAID', 'user-pb-006', 'KU-6');

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
('makam-001', 'Makam Bapak Sukarno (Alm)',  '2025-01-10', 'jenazah-001', 'KU-1'),
('makam-002', 'Makam Ibu Kartini (Almh)',   '2025-03-15', 'jenazah-002', 'KU-2'),
('makam-003', 'Makam Bapak Hatta (Alm)',    '2025-06-05', 'jenazah-003', 'KU-3'),
-- Stacked plot makam records
('makam-004', 'Makam Bapak Wahyu Santoso (Alm)',  '2024-08-05', 'jenazah-007', 'KU-5'),
('makam-005', 'Makam Ibu Dewi Rahayu (Almh)',     '2025-02-15', 'jenazah-008', 'KU-5');

-- Link Penanggung Jawab to Makam
-- _PJ_Makam: A = MakamStatus.id, B = PenanggungJawab.id
INSERT INTO "_PJ_Makam" ("A", "B") VALUES
('makam-001', 'pj-001'),
('makam-002', 'pj-002'),
('makam-003', 'pj-003'),
-- Stacked plot: pj-001 also responsible for makam-004, pj-002 for makam-005
('makam-004', 'pj-001'),
('makam-005', 'pj-002');

-- Update Blok status for active plots
-- statusBlok: DIGUNAKAN-1 (one burial), availability: TERSEDIA (can still stack),
-- statusPesanan: TIDAK DIPESAN (not currently reserved)
UPDATE "Blok" SET
    "statusBlok"               = 'DIGUNAKAN-1',
    "availability"             = 'TERSEDIA',
    "statusPesanan"            = 'TIDAK DIPESAN',
    "tanggalPemakamanTerakhir" = '2025-01-15'
WHERE id = 'KU-1';

UPDATE "Blok" SET
    "statusBlok"               = 'DIGUNAKAN-1',
    "availability"             = 'TERSEDIA',
    "statusPesanan"            = 'TIDAK DIPESAN',
    "tanggalPemakamanTerakhir" = '2025-03-20'
WHERE id = 'KU-2';

UPDATE "Blok" SET
    "statusBlok"               = 'DIGUNAKAN-1',
    "availability"             = 'TERSEDIA',
    "statusPesanan"            = 'TIDAK DIPESAN',
    "tanggalPemakamanTerakhir" = '2025-06-10'
WHERE id = 'KU-3';

-- Stacked plot: KU-5 has two burials AND a new reservation → red (TIDAK TERSEDIA + DIPESAN)
UPDATE "Blok" SET
    "statusBlok"               = 'DIGUNAKAN-2',
    "availability"             = 'TIDAK TERSEDIA',
    "statusPesanan"            = 'DIPESAN',
    "tanggalPemakamanTerakhir" = '2025-02-20'
WHERE id = 'KU-5';

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
('status-001', 'Pesanan untuk Bapak Ahmad Yani',  '2025-11-01', 'jenazah-004', 'KU-4'),
('status-002', 'Pesanan untuk Ibu Siti Rahayu',   '2025-11-15', 'jenazah-005', 'KU-5'),
('status-003', 'Pesanan untuk Bapak Budi Santoso', '2025-12-01', 'jenazah-006', 'KU-6');

-- Link Penanggung Jawab to MakamStatus
-- _PJ_MakamStatus: A = MakamStatus.id, B = PenanggungJawab.id
INSERT INTO "_PJ_MakamStatus" ("A", "B") VALUES
('status-001', 'pj-004'),
('status-002', 'pj-005'),
('status-003', 'pj-006');

-- Update Blok status for reserved plots
-- KU-4, KU-6: purely reserved (no burials yet) → KOSONG + TIDAK TERSEDIA + DIPESAN
-- KU-5: already has 2 burials + new reservation → handled above (DIGUNAKAN-2 + TIDAK TERSEDIA + DIPESAN)
UPDATE "Blok" SET
    "statusBlok"    = 'KOSONG',
    "availability"  = 'TIDAK TERSEDIA',
    "statusPesanan" = 'DIPESAN'
WHERE id IN ('KU-4', 'KU-6');

-- ============================================================================
-- 6. RELASI ORANG (User Relationships)
-- ============================================================================
-- jenisHubungan must match silsilahValues from src/validation/pemesanan.ts
INSERT INTO "RelasiOrang" ("orang1Id", "orang2Id", "jenisHubungan") VALUES
('user-001', 'user-pb-001', 'Anak'),
('user-002', 'user-pb-002', 'Orang Tua'),
('user-003', 'user-pb-003', 'Kakak Adik'),
('user-004', 'user-pb-004', 'Orang Tua'),
('user-005', 'user-pb-005', 'Kakak Adik'),
('user-006', 'user-pb-006', 'Orang Tua'),
-- Stacked plot relationships
('user-001', 'user-pb-007', 'Kakek Nenek'),
('user-002', 'user-pb-008', 'Orang Tua');

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- This dummy data includes:
-- - 8 Users (responsible parties / penanggung jawab)
-- - 8 Users (deceased / jenazah — name only)
-- - 6 PenanggungJawab records
-- - 11 Jenazah records:
--     KU-1, KU-2, KU-3: single burial (DIGUNAKAN-1)
--     KU-5: 2 buried (DIGUNAKAN-2) + 1 reserved (DIPESAN) → red blok
--     KU-4, KU-6: purely reserved (KOSONG + DIPESAN)
-- - 5 active Makam (buried plots)
-- - 3 MakamStatus (reserved plots awaiting burial)
-- - 8 RelasiOrang (PA ↔ PB relationships)
--
-- KU-5 demonstrates the mixed case: existing burials + new reservation
--   → statusBlok=DIGUNAKAN-2, availability=TIDAK TERSEDIA, statusPesanan=DIPESAN
--   → renders RED on the denah map
--   → admin table shows all 3 people (2 buried + 1 pending)
--
-- Valid enum values used:
--   statusJenazah:                DIPESAN | DIKUBURKAN | DITUMPUK-2 | DITUMPUK-3
--   statusBlok:                   KOSONG | DIGUNAKAN-1 | DIGUNAKAN-2 | DIGUNAKAN-3
--   availability:                 TERSEDIA | TIDAK TERSEDIA
--   statusPesanan:                DIPESAN | TIDAK DIPESAN
--   statusPembayaranPesanan:      UNPAID | PAID
--   statusPembayaranIuranTahunan: UNPAID | PAID
--   jenisHubungan:                see silsilahValues in src/validation/pemesanan.ts
--
-- Note: Admin, Approver, and Pengawas accounts must be created through
-- the application's registration endpoints (bcrypt hashing required).
-- ============================================================================
