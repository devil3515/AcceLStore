"use client";
import { User } from "@/payload-types";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { ScrollArea } from "./ui/scroll-area";
import { PRODUCT_CATEGORIES } from "@/config";
import Image from "next/image";
import Link from "next/link";
import {
  Key,
  KeyRound,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Store,
  UserCircleIcon,
  UserPlus,
} from "lucide-react";

const HamburgerNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <MenuIcon size={32} strokeWidth={2} />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <h2 className="text-lg font-extrabold">AcceLStore.</h2>
        </SheetHeader>
        <ScrollArea>
          {user ? (
            <>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none">
                  <div className="flex gap-2 items-center font-medium text-sm text-black mb-4">
                    <UserCircleIcon /> {user.email}
                  </div>
                  <SheetTrigger asChild>
                    <Link
                      href="/sell"
                      className="font-medium text-sm text-black"
                    >
                      <div className="flex gap-2 items-center ">
                        <Store className="text-green-600" />
                        Seller Dashboard &rarr;
                      </div>
                    </Link>
                  </SheetTrigger>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none">
                  <SheetTrigger asChild>
                    <Link
                      href="/sign-in"
                      className="font-medium text-sm text-black mb-4"
                    >
                      <div className="flex gap-2 items-center">
                        <KeyRound />
                        Sign in
                      </div>
                    </Link>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <Link
                      href="/sign-up"
                      className="font-medium text-sm text-black"
                    >
                      <div className="flex gap-2 items-center">
                        <UserPlus />
                        Create Account
                      </div>
                    </Link>
                  </SheetTrigger>
                </div>
              </div>
            </>
          )}
          <ul>
            {PRODUCT_CATEGORIES.map((category) => (
              <li key={category.label} className="space-y-10 px-4 pb-8 pt-10">
                <div className="border-b border-gray-200">
                  <div className="-mb-px flex">
                    <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                      {category.label}
                    </p>
                  </div>
                </div>

                <SheetTrigger asChild>
                  <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                    {category.featured.map((item) => (
                      <div key={item.name} className="group relative text-sm">
                        <Link href={item.href}>
                          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <Image
                              fill
                              src={item.imageSrc}
                              alt="product category image"
                              className="object-cover object-center"
                            />
                          </div>
                          <h2 className="mt-6 block font-medium text-gray-900">
                            {item.name}
                          </h2>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SheetTrigger>
              </li>
            ))}
          </ul>
        </ScrollArea>
        {user ? (
          <SheetTrigger asChild>
            <div className="flex gap-2">
              <LogOutIcon className="text-red-700" />
              <button
                onClick={signOut}
                className="cursor-pointer hover:text-red-700"
              >
                Log out
              </button>
            </div>
          </SheetTrigger>
        ) : (
          <SheetFooter>
            <a
              href="https://sandaldeep.vercel.app"
              target="_blank"
              className="text-sm text-muted-foreground"
            >
              Copyright &copy; {new Date().getFullYear()} Sandaldeep. All rights
              reserved.
            </a>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerNav;
