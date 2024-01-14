import React from "react";
import Register from "./app/shared/components/Register";
import Login from "./app/shared/components/Login";
import Layout from "./app/shared/components/Layout";
import Linkpage from "./app/shared/pages/Linkpage";
import Unauthorized from "./app/shared/pages/Unauthorized";
import Missing from "./app/shared/pages/Missing";
import Home from "./app/shared/pages/Home";
import Editor from "./features/Editor/pages/Editor";
import Admin from "./features/Admin/pages/Admin";
import Lounge from "./features/Lounge/pages/Lounge";
import RequireAuth from "./app/shared/components/RequireAuth";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes  */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<Linkpage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* private routes  */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1984]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all  */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;
