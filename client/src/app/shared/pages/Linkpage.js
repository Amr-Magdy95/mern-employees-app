import React from "react";
import { Link } from "react-router-dom";

const Linkpage = () => {
  return (
    <section className="min-w-screen min-h-screen bg-slate-400 flex">
      <div className="h-fit max-h-screen w-1/2  mx-auto bg-slate-600  px-10 py-8 rounded-lg text-white max-md:w-4/5 mt-5 space-y-1">
        <h1 className="text-4xl mb-3">Link Page</h1>
        <h2 className="text-3xl mb-2">Public Routes</h2>
        <ul className="ml-3 space-y-2">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <h2 className="text-3xl mb-2">Private Routes</h2>
        <ul className="ml-3 space-y-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/editor">Editors Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Linkpage;
