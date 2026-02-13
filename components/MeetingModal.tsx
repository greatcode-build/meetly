import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  handleClick: () => void;
  className?: string;
  children?: React.ReactNode;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  handleClick,
  className,
  image,
  buttonIcon,
  children,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-full max-w-130 border-none bg-[#161925] px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
        </div>
        <DialogTitle
          className={cn(
            "text-3xl font-bold text-center leading-10.5",
            className,
          )}
        >
          {title}
        </DialogTitle>
        <DialogDescription asChild>
          <div>{children}</div>
        </DialogDescription>
        <Button
          className="bg-[#0E78F9] focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={handleClick}
        >
          {buttonIcon && (
            <Image src={buttonIcon} alt="button icon" width={13} height={13} />
          )}{" "}
          {buttonText || "Schedule Meeting"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export { MeetingModal };
