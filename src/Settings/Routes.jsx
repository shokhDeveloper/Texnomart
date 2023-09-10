import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import { getItem } from "./Utils";
import { Home } from "../Private";
import { Home as PublicHome } from "../Public";
import { Hero, LikesTovarPage } from "../Components";
export const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      {getItem("token") ? (
        <>
          <Route path="/*" element={<PublicHome/>} />
        </>
      ) : (
        <>
          <Route path="/*" element={<PublicHome />}/>
        </>
      )}
    </>
  )
);
