-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user_roles" (
    "user_id" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id","role")
);

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
