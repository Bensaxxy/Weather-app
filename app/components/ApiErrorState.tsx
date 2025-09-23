import Image from "next/image";

interface ApiErrorStateProps {
  message?: string;
  // onRetry?: () => void;
}

const ApiErrorState: React.FC<ApiErrorStateProps> = ({ message }) => {
  return (
    <div className="overflow-hidden rounded-xl flex flex-col items-center justify-center">
      <Image src="/images/icon-error.svg" alt="error" width={40} height={40} />
      <h1
        className="text-6xl md:text-5xl xl:text-6xl text-center my-6 md:my-8"
        style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
      >
        {message || "Something Went Wrong"}
      </h1>
      <p className="text-lg text-neutral-300">
        We couldn't connect to the server (API error). Please try again in a few
        moments
      </p>
      <button
        // onClick={onRetry}
        className="bg-neutral-700 dark:bg-neutral-300/20 px-4 py-2 rounded-lg flex gap-2 text-lg cursor-pointer mt-4"
      >
        <Image
          src="/images/icon-retry.svg"
          width={16}
          height={16}
          alt="retry-icon"
        />
        Retry
      </button>
    </div>
  );
};
export default ApiErrorState;
