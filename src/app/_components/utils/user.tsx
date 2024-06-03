interface UserProps {
  name: string;
  email: string;
  image: string;
  showUser: boolean;
}
export default function User({ name, email, image, showUser }: UserProps) {
  return (
    <div
      className={`absolute -top-8 left-12 ml-10 h-60 w-64 rounded-lg border-2 border-gray-200 bg-white pt-4 shadow-md ${showUser ? "" : "hidden"}`}
    >
      <img
        src={image}
        alt="user image"
        className="mx-auto w-[40%] rounded-full"
      />
      <p className="my-4 w-full text-center text-2xl text-primary">{name}</p>
      <p className="w-full text-center">{email}</p>
    </div>
  );
}
