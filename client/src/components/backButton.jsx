import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1 || "/");
  };

  return (
    <button
      onClick={handleBack}
      className="
        group relative inline-flex items-center justify-center gap-2
        rounded-lg px-6 py-3 text-sm font-medium
        bg-muted text-foreground
        cursor-pointer overflow-hidden
        hover:bg-[var(--color-primary)/90]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring) focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        transition-colors duration-200
      "
    >
      <span className="transition-all duration-200 opacity-0 w-0 group-hover:opacity-100 group-hover:w-3">
        <svg
          aria-label="Back Arrow"
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
          fill="none"
          role="img"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 19l-7-7 7-7M3 12h18"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </span>
      <span>Back</span>
    </button>
  );
};

export default BackButton;
