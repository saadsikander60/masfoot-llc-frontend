import "./globals.css";
import AppWrapper from "./components/AppWrapper";
import AuthGuard from "./components/AuthGuard";

export const metadata = {
  title: "Masfoot LLC",
  description: "Vehicle Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-black">
        
        {/* 🔥 Auth Guard */}
        <AuthGuard>
          <AppWrapper>{children}</AppWrapper>
        </AuthGuard>

      </body>
    </html>
  );
}