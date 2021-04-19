import { User } from "../../server/app/lib/graphql/models/user.model";
import Card from "./card";

export default function Swyper({ matches, user, callback }: { matches: User[]; user: User; callback: () => void }) {
    return (
        <div className="swyper relative max-w-xl mx-auto my-8 w-full overflow-hidden">
            {matches.every((u) => u) ? (
                matches.map((user, i) => <Card user={user} key={i} callback={callback} />)
            ) : (
                <div className="swyper-no w-full grid place-items-center">
                    <h2 className="text-2xl sm:text-3xl text-gray-300 mx-2">
                        {user.tags.length ? "Something's gone wrong :(" : "Add a tag to your profile to get started"}
                    </h2>
                </div>
            )}
        </div>
    );
}
