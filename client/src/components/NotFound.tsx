import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col text-center h-screen justify-center text-xl text-light z-20">
      <h1 className="z-20">404 - Page Not Found</h1>
      <p className="z-20">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
