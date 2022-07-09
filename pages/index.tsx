import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Container from "../components/Container";

const Home: NextPage = () => {
  return (
    <Container>
      <div className="container lg:text-center max-w-4xl m-auto px-4 mt-2">
        <Image
          src="/static/images/gonzaleraRanch.jpg"
          alt="my desk"
          width={1920 / 4}
          height={1280 / 4}
        />
      </div>
      <div className="lg:text-center py-2 bg-white mt-2">
        <p className="mt-2 text-blue-800 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
          Welcome to Animals Inventory
        </p>
        <p className="mt-2 text-blue-600 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
          Gonzalera Ranch
        </p>
        <div className=":text-center py-2 bg-white mt-2">
          <Image
            src="/static/images/logo.jpg"
            alt="my desk"
            width={1920 / 8}
            height={1280 / 8}
          />
        </div>

        <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div className="bg-amber-500 cursor-pointer text-white p-4 rounded-md text-center shadow-xl">
            <div className="mt-2 font-bold">Ganados</div>
            <div className="font-light">Some Ganados</div>
          </div>

          <div className="bg-red-500 cursor-pointer text-white p-4 rounded-md text-center shadow-xl">
            <div className="mt-2 font-bold">Caballos</div>
            <div className="font-light">Some Caballos</div>
          </div>

          <div className="bg-green-500 cursor-pointer text-white p-4 rounded-md text-center shadow-xl">
            <div className="mt-2 font-bold">Chivos</div>
            <div className="font-light">Some Chivos</div>
          </div>

          <div className="bg-purple-500 cursor-pointer text-white p-4 rounded-md text-center shadow-xl">
            <div className="mt-2 font-bold">Conucos</div>
            <div className="font-light">Some conucos</div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </Container>
  );
};

export default Home;
