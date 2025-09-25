import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReceiptProvider } from "@/context/ReceiptContext";
import Layout from "@/components/layout/Layout";
import ReceiptForm from "@/components/receipt/ReceiptForm";
import ReceiptPreview from "@/components/receipt/ReceiptPreview";
import HelpPage from "@/components/pages/HelpPage";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import SignUp from "./components/authorization/SignUp";
import SignIn from "./components/authorization/SignIn";
import LandingPage from "./components/pages/LandingPage";
import ProtectedRoute from "./components/common/ProtectedRoute"; // ✅ import
import LogoutRedirect from "./components/common/LogoutRedirect";
import ContactSupport from "./components/pages/ContactSuuport";
import ReceiptDashboard from "./components/pages/ReceiptDashboard";

function App() {
  return (
    <ErrorBoundary>
      <ReceiptProvider>
        <Router>
          <Layout>
            <Routes>
              {/* ✅ Default page = LandingPage */}
              <Route path="/" element={<LandingPage />} />

              {/* ✅ Protected /home route */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <>
                      <div className="text-center mb-8 animate-fade-in">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                          Receipt Generator
                        </h1>
                        <p className="text-gray-600">
                          Create professional receipts in seconds
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="animate-slide-up">
                          <ReceiptForm />
                        </div>
                        <div
                          className="animate-slide-up"
                          style={{ animationDelay: "0.1s" }}
                        >
                          <ReceiptPreview />
                        </div>
                      </div>
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/help"
                element={
                  <ProtectedRoute>
                    <HelpPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ReceiptDashboard/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contactus"
                element={
                  <ProtectedRoute>
                    <ContactSupport/>
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/logout" element={<LogoutRedirect/>}/>
            </Routes>
          </Layout>
        </Router>
      </ReceiptProvider>
    </ErrorBoundary>
  );
}

export default App;
