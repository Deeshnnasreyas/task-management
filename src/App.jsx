import { Outlet } from "react-router-dom";
import Layout from "./layout/Layout";
export default function App() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}
