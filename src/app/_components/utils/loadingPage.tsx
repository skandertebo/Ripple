export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative h-20 w-20">
        <div className="animate-ripple absolute inset-0 rounded-full border-4 border-primary bg-transparent opacity-75"></div>
        <div className="animate-ripple animation-delay-1 absolute inset-0 rounded-full border-4 border-primary bg-transparent opacity-75"></div>
        <div className="animate-ripple animation-delay-2 absolute inset-0 rounded-full border-4 border-primary bg-transparent opacity-75"></div>
      </div>
    </div>
    // <div className="flex min-h-screen items-center justify-center bg-gray-100">
    //   <div className="flex flex-col items-center">
    //     <svg
    //       className="mb-4 h-12 w-12 animate-spin text-primary"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //     >
    //       <circle
    //         className="opacity-25"
    //         cx="12"
    //         cy="12"
    //         r="10"
    //         stroke="currentColor"
    //         strokeWidth="4"
    //       ></circle>
    //       <path
    //         className="opacity-75"
    //         fill="currentColor"
    //         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    //       ></path>
    //     </svg>
    //   </div>
    // </div>
  );
}
