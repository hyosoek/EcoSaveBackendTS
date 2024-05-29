-- Create the Account table
CREATE TABLE "account" (
    "id" SERIAL PRIMARY KEY,
    "mail" VARCHAR(100) UNIQUE,
    "pw" VARCHAR(32),
    "nickname" VARCHAR(32) UNIQUE,
    "longitude" FLOAT,
    "latitude" FLOAT,
    "location" geometry,
    CONSTRAINT "location_unique" UNIQUE ("id", "location")
);

-- Create an index on the mail column of the Account table
CREATE INDEX "mail_idx" ON "account" ("mail");

-- Create the spatial_ref_sys table
CREATE TABLE "spatial_ref_sys" (
    "srid" INT PRIMARY KEY,
    "auth_name" VARCHAR(256),
    "auth_srid" INT,
    "srtext" VARCHAR(2048),
    "proj4text" VARCHAR(2048)
);

-- Create the Refrigerator table
CREATE TABLE "refrigerator" (
    "id" SERIAL PRIMARY KEY,
    "account_id" INT DEFAULT nextval('refrigerator_account_id_seq'),
    "energy" REAL,
    "co2" REAL,
    "model_name" VARCHAR(50),
    "location" geometry,
    CONSTRAINT "refrigerator_account_id_fkey" FOREIGN KEY ("account_id", "location") REFERENCES "account" ("id", "location") ON DELETE CASCADE
);

-- Create a GIST index on the location column of the Refrigerator table
CREATE INDEX "gist_idx" ON "refrigerator" USING GIST ("location");
