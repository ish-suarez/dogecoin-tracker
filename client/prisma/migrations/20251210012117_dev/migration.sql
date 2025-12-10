-- CreateTable
CREATE TABLE "SoftDeletePrices" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SoftDeletePrices_pkey" PRIMARY KEY ("id")
);
