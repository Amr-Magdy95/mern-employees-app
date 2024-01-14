import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-w-screen min-h-screen bg-slate-400 flex">
      <div className="h-fit max-h-screen w-1/2  mx-auto bg-slate-600  px-10 py-8 rounded-lg text-white max-md:w-4/5 mt-5 space-y-1">
        <h1 className="text-4xl mb-3">Home Page</h1>
        <ul className="ml-3 space-y-2">
          <li>
            <Link to="/editor">Editors Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
          <li>
            <Link to="/lounge">Lounge Page</Link>
          </li>
          <li>
            <Link to="/linkpage">Go to Links</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
