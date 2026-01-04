"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-66">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            height={36}
            width={36}
            className="cursor-pointer sm:hidden"
            alt="hamburger icon"
          />
        </SheetTrigger>
        <SheetHeader className="hidden">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>menu icons</SheetDescription>
        </SheetHeader>
        <SheetContent side="left" className="border-none bg-[#1C1F2E] ">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.png"
              width={42}
              height={42}
              alt="meetly logo"
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">Meetly</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-hidden">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route;
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex items-center p-4 gap-4 rounded-lg w-full max-w-60",
                          { "bg-[#0E78F9]": isActive }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                          className="w-6 h-auto"
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export { MobileNav };
