import { avatarImages } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface MeetingCardProps {
  icon: string;
  title: string;
  date: string;
  isPreviousMeeting?: boolean;
  handleClick?: () => void;
  buttonIcon1?: string;
  buttonText?: string;
  link?: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  handleClick,
  buttonIcon1,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="flex flex-col w-full justify-between rounded-[14px] px-5 py-8 min-h-64.5 xl:max-w-142 bg-[#1C1F2E]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex justify-center items-center absolute rounded-full size-10 left-34 border-[5px] bg-[#1E2757] border-[#252A41]">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2 px-4">
            <Button onClick={handleClick} className="bg-[#0E78F9] rounded px-4">
              {buttonIcon1 && (
                <Image src={buttonIcon1} width={20} height={20} alt="feature" />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText("link");
                toast("Link copied");
              }}
              className="bg-[#1E2757] px-4"
            >
              <Image
                src="/icons/copy.svg"
                width={20}
                height={20}
                alt="feature"
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export { MeetingCard };
