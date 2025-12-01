-- CreateTable
CREATE TABLE "DogePricesArchive" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DogePricesArchive_pkey" PRIMARY KEY ("id")
);
