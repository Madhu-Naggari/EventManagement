import { Link } from "react-router-dom";

const InternalServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="500 Internal Server Error"
        className="w-64 md:w-96 mb-6"
      />

      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        <span className="text-destructive">500</span>
        <br />
        Internal Server Error
      </h1>

      <p className="text-center text-lg md:text-xl mb-4">
        We are currently trying to fix the problem.
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Illustration taken from{" "}
        <Link
          to="/"
          className="text-primary underline hover:text-primary-foreground"
        >
          Eventra.com
        </Link>
      </p>
    </div>
  );
};

export default InternalServerError;
