import { useRef, useState } from "react";
import { User } from "../../server/app/lib/graphql/models/user.model";
import { formatMacroCase } from "../lib/utils";

export default function Card({ user, callback }: { user: User; callback: () => void }) {
    const [isDragging, setIsDragging] = useState(false);
    const [locked, setLocked] = useState(false);
    const self = useRef<HTMLDivElement | null>(null);

    const cancel = () => {
        if (locked) return;

        setIsDragging(false);

        const div = self.current!;

        if (parseInt(div.style.transform.match(/\d+/)?.[0] || "0") > parseInt(getComputedStyle(div).width) / 4) {
            div.style.transform = `translateX(${getComputedStyle(div).width})`;
            callback();
            setLocked(true);
            setTimeout(() => {
                setLocked(false);
                div.style.transition = "";
                div.style.transform = "translateX(0)";
                setTimeout(() => (div.style.transition = "0.25s transform linear"), 4);
            }, 250);
        } else div.style.transform = "translateX(0)";
    };

    return (
        <div
            className="absolute w-full h-full bg-white flex flex-col border-2 border-gray-100 rounded"
            style={{
                cursor: isDragging ? "grabbing" : "grab",
                transition: "0.25s transform linear",
            }}
            ref={self}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={cancel}
            onMouseOut={cancel}
            onMouseMove={(e) => {
                if (locked) return;

                const div = self.current!;

                if (isDragging) {
                    const { left } = div.parentElement.getBoundingClientRect();

                    div.style.transform = `translateX(${Math.max(Math.round(e.clientX - left), 0)}px)`;
                }
            }}
        >
            <img className="w-full select-none " src={user.avatar} alt="" draggable={false} />
            <div className="bg-gray-50 flex-1 p-4 flex flex-col">
                <h3 className="text-gray-900 text-2xl pb-2 mb-2 border-b-2 border-gray-100">{user.username}</h3>
                <p className="text-gray-900 text-sm leading-snug flex-1">
                    {(user.bio.length > 512 ? user.bio.slice(512 - 3) + "..." : user.bio) || (
                        <i className="text-gray-300">No bio.</i>
                    )}
                </p>
                <div>
                    <span className="uppercase italic text-xs text-gray-400">Tags:</span>
                    <p>{user.tags.map(formatMacroCase).join(", ")}</p>
                </div>
            </div>
        </div>
    );
}
