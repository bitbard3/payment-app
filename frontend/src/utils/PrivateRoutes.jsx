import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const PrivateRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function checkToken() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");
        const res = await axios.get(
          "https://payment-app-red.vercel.app/api/v1/user/validUser",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="h-screen w-screen bg-dark flex items-center justify-center">
          <Skeleton className="h-[95%] w-[95%] bg-gray-600"></Skeleton>
        </div>
      </>
    );
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default PrivateRoutes;
