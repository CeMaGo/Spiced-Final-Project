import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useSession, getSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  // const [session, setSession] = useState(false);
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      {/* <main className={styles.main}> */}
      {session ? User({ session, handleSignOut }) : Guest()}
      {/* </main> */}
    </div>
  );
}
// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage, Just Visiting</h3>

      <div className="flex justify-center">
        <Link
          href={"/login"}
          className="mt-5 px10 py-1 rounded-sm bg-violet-500 text-gray-50"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
// now Authorized User

function User({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">
        Authorized User Homepage, Good to have you!
      </h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="mt-5 px-1- py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Sign out
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          href={"/profile"}
          className="mt-5 px10 py-1 rounded-sm bg-violet-500 text-gray-50"
        >
          Profile Page
        </Link>
      </div>
    </main>
  );
}

// req returns cookie
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return;
  {
    props: {
      session;
    }
  }
}

// useEffect(() => {
//   const fetchData = async () => {
//     const res = await fetch(`http://localhost:3000/api/tasks`);
//     const data = await res.json();
//     console.log(data);
//   };
//   fetchData();
// }, []);
// if (session) {
//   return (
//     <>
//       Signed In as {session.user.email}
//       <br />
//       <button
//         onClick={() => {
//           singOut();
//         }}
//       >
//         Sign Out
//       </button>
//     </>
//   );

// return<>
//   Not signed In  <br/>
//   <button onClick={()=>{signIn()}}>Sign In</button>
// </>
