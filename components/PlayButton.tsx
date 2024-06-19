import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
    const router = useRouter();

    return (
        <button onClick={() => router.push(`/watch/${movieId}`)} className="
            bg-yellow-500 text-red-700
            rounded-md
            py-1 md:py-2
            px-2 md:px-4
            w-auto
            text-xs lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-yellow-600
            transition
        ">
            <BsFillPlayFill size={25} className="mr-1" />
            Play
        </button>
    )
};

export default PlayButton;