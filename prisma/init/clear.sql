-- ============================================================================
-- CLEAR.SQL - Delete All Data from Database
-- ============================================================================
-- This file removes all data from the database while preserving the schema.
-- Use this to reset the database to a clean state before running setup.sql
-- or dummy.sql again.
--
-- ⚠️  WARNING: This will DELETE ALL DATA in the database!
-- ⚠️  This operation CANNOT be undone!
--
-- Purpose: Clear all data from tables (preserves schema structure)
-- Usage: psql $DATABASE_URL -f prisma/init/clear.sql
-- ============================================================================

-- Delete all data (FK-safe order)
TRUNCATE TABLE 
    "MakamStatus",
    "Makam",
    "_PJ_Makam",
    "_PJ_MakamStatus",
    "Jenazah",
    "PenanggungJawab",
    "RelasiOrang",
    "User",
    "Blok"
CASCADE;

-- Reset sequences (auto-increment counters)
ALTER SEQUENCE IF EXISTS "RelasiOrang_id_seq" RESTART WITH 1;

-- ============================================================================
-- Database cleared successfully!
-- Next steps:
-- 1. Run setup.sql to initialize cemetery plot layout
-- 2. (Optional) Run dummy.sql to add test data
-- ============================================================================
