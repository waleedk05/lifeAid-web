import NavBar from "@/components/NavBar";

export const metadata = {
  title: "LifeAid — User Area",
  description: "User area with floating navbar",
};

export default function UserLayout({children}) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-16 pb-0">{children}</main>
    </>
  );
}
