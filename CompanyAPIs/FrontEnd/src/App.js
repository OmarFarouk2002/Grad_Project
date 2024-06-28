import {
  RouterProvider,
  createHashRouter,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { SignUp } from "./Pages/SignUp/SignUp";
import { NotFound } from "./Pages/NotFound/NotFound";
import { MainLayOut } from "./Pages/MainLayOut/MainLayOut";
import AuthContextProvider from "./Context/AuthContext";
import { Operations } from "./Pages/Operations/Operations";
import { DocumentForm } from "./Pages/DocumentForm/DocumentForm";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import About from "./Pages/About/About";
import { Profile } from "./Pages/Profile/Profile";
import { SingleOperation } from "./Pages/SingleOperation/SingleOperation";
import { SingleDocument } from "./Pages/SingleDocument/SingleDocument";
import OperationContextProvider from "./Context/OperationsContext";
import { OperationForm } from "./Pages/OperationForm/OperationForm";
import DocumentContextProvider from "./Context/DocumentsContext";
import { LoginForUser } from "./Pages/LoginForUser/LoginForUser";
import { LoginEmployee } from "./Pages/LoginEmployee/LoginEmployee";
import { RegistrationUser } from "./Pages/RegistrationUser/RegistrationUser";
import { Toaster } from "react-hot-toast";
import { UserOperation } from "./Pages/UserOperation/UserOperation";
import { SingleUserOperation } from "./Pages/SingleUserOperation/SingleUserOperation";
import { Invoice } from "./Pages/Invoice/Invoice";
import Payment from "./Pages/Payment/Payment";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "operationForm",
          element: (
            <ProtectedRoute>
              <OperationForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "operation",
          element: (
            <ProtectedRoute>
              <Operations />
            </ProtectedRoute>
          ),
        },
        {
          path: "userOperations",
          element: (
            <ProtectedRoute>
              <UserOperation />
            </ProtectedRoute>
          ),
        },
        {
          path: "report",
          element: (
            // <ProtectedRoute>
            <Dashboard />
            //  </ProtectedRoute>
          ),
        },
        {
          path: "userOperations/:id",
          element: (
            <ProtectedRoute>
              <SingleUserOperation />
            </ProtectedRoute>
          ),
        },
        {
          path: "operation/:id",
          element: (
            <ProtectedRoute>
              <SingleOperation />
            </ProtectedRoute>
          ),
        },
        {
          path: "document/:id",
          element: (
            <ProtectedRoute>
              <SingleDocument />
            </ProtectedRoute>
          ),
        },
        {
          path: "documentForm/:operationId",
          element: (
            <ProtectedRoute>
              <DocumentForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "invoice",
          element: (
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          ),
        },
        {
          path: "payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        { path: "signup", element: <SignUp /> },
        { path: "signupforuser", element: <RegistrationUser /> },

        { path: "loginforuser", element: <LoginForUser /> },
        { path: "loginforEmployee", element: <LoginEmployee /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <AuthContextProvider>
      <OperationContextProvider>
        <DocumentContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
        </DocumentContextProvider>
      </OperationContextProvider>
    </AuthContextProvider>
  );
}

export default App;
