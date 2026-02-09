import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="p-5 border-b-5 border-sold border-amber-700 bg-amber-600 flex ">
          <div className="flex flex-col items-center w-full  text-white">
            <Link href={"/"} className="text-3xl font-bold text-center">
              Your Notes
            </Link>
            <p className="text-xs text-center">Note Anything</p>
            <div className="flex justify-start">
              <Link
                href="/create-note"
                className=" bg-amber-700 text-white rounded-3xl w-40  m-8 block font-bold text-center hover:cursor"
              >
                Create new Note
              </Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
