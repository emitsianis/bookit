import { Inter } from "next/font/google";
import "../assets/styles/globals.css";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthWrapper from '@/app/components/AuthWrapper';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Bookit App | Book a room", description: "Book a meeting and conference room for your team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body
      className={`${inter.className} antialiased`}
    >
    <AuthWrapper>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
      <ToastContainer />
    </AuthWrapper>
    </body>
    </html>
  );
}
