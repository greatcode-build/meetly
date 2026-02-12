import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        height={50}
        width={50}
        loading="eager"
      />
    </div>
  );
};

export { Loader };
