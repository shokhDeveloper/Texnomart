import { Continuation, Header, Hero, LikesTovarPage, ProfileSettings } from "../Components";
import { Outlet, Route, Routes } from "react-router";
export const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Hero />} />
        <Route path="/home/*" element={<Hero/>}/>
        <Route path="/sevimlilar" element={<LikesTovarPage />} />
        <Route path="/profile-settings" element={<ProfileSettings/>}/>
        <Route path="/continuation" element={<Continuation/>}/>
      </Routes>
    </>
  );
};
