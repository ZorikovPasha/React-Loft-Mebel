import type { GetResult } from "prisma"

export {}

type RolesType = "BASIC" | "EDITOR" | "AUTHOR" | "ADMIN"

declare global {
  namespace Express {
    interface Locals {
      user: GetResult<{
        id: string;
        name: string;
        surname: string;
        userName: string;
        password: string;
        email: string;
        phone: string;
        city: string | null;
        street: string | null;
        house: string | null;
        apartment: string | null;
        photo: Buffer | null;
        role: RolesType;
        emailConfirmed: boolean;
        wantsToReceiveEmailUpdates: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}
    }
  }
}

export interface IAppLocals {
  user: GetResult<{
    id: string;
    name: string;
    surname: string;
    userName: string;
    password: string;
    email: string;
    phone: string;
    city: string | null;
    street: string | null;
    house: string | null;
    apartment: string | null;
    photo: Buffer | null;
    role: RolesType;
    emailConfirmed: boolean;
    wantsToReceiveEmailUpdates: boolean;
    createdAt: Date;
    updatedAt: Date;
  }, unknown> & {}
}
