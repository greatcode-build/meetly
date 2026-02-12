import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between fixed w-full z-50 bg-[#1C1F2E] px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.png"
          width={42}
          height={42}
          alt="meetly logo"
          className="max-sm:size-10 w-10 h-auto"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Meetly
        </p>
      </Link>
      <div className="flex justify-between items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export { Navbar };
