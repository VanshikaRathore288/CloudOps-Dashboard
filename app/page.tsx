import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="/lynn.png"
        alt="profile"
        className="w-[240px] h-[240px] rounded-lg "
      />
      <h1 className="mt-4">Hello, this is my first Next.js app </h1>
      <h1>deployed on AWS EC2 using Docker.</h1>
    </div>
  );
}
