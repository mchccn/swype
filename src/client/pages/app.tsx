import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { User } from "../../server/app/lib/graphql/models/user.model";
import Meta from "../components/meta";
import Swyper from "../components/swyper";

export default function App({ accessToken }: { accessToken: string | null }) {
    const [user, setUser] = useState<User | null>(null);
    const [matches, setMatches] = useState<User[]>([]);

    const [menu, setMenu] = useState(false);

    const m = useRef<HTMLDivElement | null>(null);

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
            accessToken
            refreshToken
            bio
            tags
            matches
            rejections
        }
    }`,
                    }),
                });

                const json = await res.json();

                if (json.errors) return;

                setUser(json.data.user);
            }
        })();

        document.addEventListener("click", (e) => {
            if (!m.current.contains(e.target as HTMLElement)) setMenu(false);
        });
    }, []);

    useEffect(() => {
        (async () => {
            if (user) {
                setMatches(await Promise.all(new Array(3).fill("").map(getMatch)));
            }
        })();
    }, [user]);

    const getMatch = async () => {
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
                userMatch(id: "${user.id}") {
                    id
                    avatar
                    username
                    bio
                    tags
                }
            }
            `,
            }),
        });

        const json = await res.json();

        if (json.errors) return getMatch();

        return json.data.userMatch;
    };

    return (
        <>
            <Meta />
            <div className="flex flex-col min-h-screen">
                {user ? (
                    <>
                        <header className="mx-4">
                            <div className="max-w-4xl mx-auto border-b-2 border-gray-200">
                                <div className="flex justify-between items-center py-3">
                                    <a href="/">
                                        <div className="flex items-center">
                                            <img className="h-12 w-12" src="/swype.png" alt="" />
                                            <img className="h-10" src="/swypetext.png" alt="" />
                                        </div>
                                    </a>
                                    <div className="flex items-center">
                                        <p className="text-gray-400 mr-2 select-none">{user.username}</p>
                                        <div className="flex items-center relative" ref={m}>
                                            <img
                                                src={user.avatar}
                                                alt=""
                                                className="w-12 h-12 rounded-full cursor-pointer"
                                                onClick={() => setMenu(!menu)}
                                            />
                                            <div
                                                className={`${
                                                    menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                                                } absolute top-full right-0 w-48 flex flex-col bg-gray-50 rounded overflow-hidden border border-gray-100 transition-opacity z-10`}
                                            >
                                                <p className="cursor-pointer px-3 py-2 hover:bg-gray-100 transition-colors">
                                                    Settings
                                                </p>
                                                <p className="cursor-pointer px-3 py-2 hover:bg-gray-100 transition-colors">
                                                    Matches
                                                </p>
                                                <a
                                                    href="/auth/logout"
                                                    className="cursor-pointer px-3 py-2 hover:bg-red-100 transition-colors bg-red-50 text-red-600"
                                                >
                                                    Log out
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <Swyper
                            matches={matches}
                            user={user}
                            callback={async () => setMatches([await getMatch(), ...matches.slice(0, 2)])}
                        />
                    </>
                ) : (
                    <div></div>
                )}
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
