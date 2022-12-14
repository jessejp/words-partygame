import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import styles from "./index.module.css";
import type { Url } from "url";

const Home: NextPage = () => {
  //const { data } = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const createSession = trpc.useMutation("createSession");
  const onCreateSession = () => {
    createSession.mutate("testingthis");
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>
          <h1 className={styles.title}>Word Partygame</h1>

          <Link href={"testurl"}>
            <button>START</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
