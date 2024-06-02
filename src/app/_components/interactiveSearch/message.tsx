import { FaRegCircleUser } from "react-icons/fa6";
import { FiAperture } from "react-icons/fi";
export interface MessageProps {
  type: "user" | "bot";
  content: string;
}

export default function Message({ type, content }: MessageProps) {
  return (
    <div className="">
      <div className="text-left">
        {type === "user" ? (
          <FaRegCircleUser className="mb-4 mr-1 inline-block h-8 w-8" />
        ) : (
          <FiAperture className="mb-4 mr-1 inline-block h-8 w-8 text-primary" />
        )}
        <span
          className={
            type === "bot"
              ? "inline-block w-fit text-3xl font-semibold text-primary"
              : "inline-block w-fit text-3xl font-semibold"
          }
        >
          {type === "user" ? "You" : "AIIN"}
        </span>
      </div>
      <p className="ml-10">{content}</p>
    </div>
  );
}
