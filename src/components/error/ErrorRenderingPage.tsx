import Image from "next/image";

interface ErrorRenderingPageInterface {
  errorMessage: string;
}

export default function ErrorRenderingPage({
  errorMessage,
}: ErrorRenderingPageInterface) {
  return (
    <>
      <div className="p-5 shadow">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-5">
            <Image
              src={"/images/icon/sad.png"}
              alt="Sad Icon"
              loading="lazy"
              width={200}
              height={200}
            />
          </div>
          <div>
            <h1 className="font-bold">Maaf Sedang Ada Error ({errorMessage})</h1>
          </div>
        </div>
      </div>
    </>
  );
}
