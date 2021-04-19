import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Typist from "react-typist";
import { User } from "../../server/app/lib/graphql/models/user.model";
import Meta from "../components/meta";

export default function Index({ accessToken }: { accessToken: string | null }) {
    const [_, rerender] = useState(0);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            if (accessToken) {
                const res = await fetch("/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer: ${accessToken}`,
                    },
                    body: JSON.stringify({
                        query: `\
    {
        user(accessToken: "${accessToken}") {
            id
            avatar
            username
        }
    }`,
                    }),
                });

                const json = await res.json();

                if (json.errors) return;

                setUser(json.data.user);
            }
        })();
    }, []);

    return (
        <>
            <Meta />
            <div>
                <div className="relative bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                            <svg
                                className="pointer-events-none hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                                fill="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <polygon points="50,0 100,0 50,100 0,100" />
                            </svg>
                            <header>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                                    <div className="flex justify-between items-center py-4">
                                        <a href="/">
                                            <div className="flex items-center">
                                                <img className="h-16 w-16 mr-1" src="/swype.png" alt="" />
                                                <img className="h-14" src="/swypetext.png" alt="" />
                                            </div>
                                        </a>
                                        <div className="flex items-center justify-end md:flex-1 lg:w-0">
                                            <a
                                                href={user ? "/app" : "/auth"}
                                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                            >
                                                {user ? "Open" : "Log in"}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <main className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 md:mt-16 lg:px-8">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        <span className="block xl:inline">Find people with</span>{" "}
                                        <span className="block text-blue-600 xl:inline">
                                            similar{" "}
                                            <Typist className="inline" onTypingDone={() => rerender(Math.random())} key={_}>
                                                <span>interests</span>
                                                <Typist.Backspace count={"interests".length} delay={1000} />
                                                <Typist.Delay ms={250} />
                                                <span>hobbies</span>
                                                <Typist.Backspace count={"hobbies".length} delay={1000} />
                                                <Typist.Delay ms={250} />
                                                <span>goals</span>
                                                <Typist.Backspace count={"goals".length} delay={1000} />
                                                <Typist.Delay ms={250} />
                                            </Typist>
                                        </span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        Swype allows you to easily discover others like you. Match with people based on your
                                        hobbies, interests, and goals. <br className="lg:hidden" />
                                        Join the Discord to get started!
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <a
                                                href={user ? "/app" : "/auth"}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-3 md:text-lg md:px-7"
                                            >
                                                {user ? "Start swiping" : "Get started"}
                                            </a>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <a
                                                href="https://discord.com/invite/NqDS7HuTbB"
                                                target="_blank"
                                                rel="nofollow"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-3 md:text-lg md:px-7"
                                            >
                                                Join
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img
                            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=88"
                            alt=""
                        />
                    </div>
                </div>
                <div className="py-10 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                        <div className="lg:text-center">
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue-600 sm:text-4xl">
                                Find your kind of people, easily
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
                                With a simple user interface, Swype makes it extremely easy to find new people that are just
                                like you.
                            </p>
                        </div>
                        <div className="mt-12">
                            <dl className="flex flex-col lg:flex-row justify-between">
                                <div className="relative mb-8 max-w-lg">
                                    <dt className="flex items-center mb-4">
                                        <div className="absolute flex items-center justify-center h-8 w-8 rounded-md bg-blue-500 text-white">
                                            <svg
                                                className="h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-12 text-lg leading-6 font-medium text-gray-900">Connect to any user</p>
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Swype allows you to connect to any other user in an instant. You don't need to worry
                                        about anything else other than finding other people!
                                    </dd>
                                </div>
                                <div className="relative mb-8 max-w-lg lg:mx-10">
                                    <dt className="flex items-center mb-4">
                                        <div className="absolute flex items-center justify-center h-8 w-8 rounded-md bg-blue-500 text-white">
                                            <svg
                                                className="h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-12 text-lg leading-6 font-medium text-gray-900">
                                            Lightning fast and easy
                                        </p>
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        It's very easy to get started and really fast to use; just swipe! Swype has been
                                        optimized to be lightweight and performant.
                                    </dd>
                                </div>
                                <div className="relative mb-8 max-w-lg">
                                    <dt className="flex items-center mb-4">
                                        <div className="absolute flex items-center justify-center h-8 w-8 rounded-md bg-blue-500 text-white">
                                            <svg
                                                className="h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="ml-12 text-lg leading-6 font-medium text-gray-900">
                                            Instant notifications
                                        </p>
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        We'll notify you of anything important instantly, including matches, of course. You can
                                        turn notifications off at any time.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            accessToken: ctx.req.cookies["access_token"] ?? null,
        },
    };
};
