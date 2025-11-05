import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { clearAdmin } from "@/store/slices/authSlice";

export default function Header() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearAdmin());
    }

    const { uid } = useSelector((state: RootState) => state.admin);
    return (
        <header className="w-full fixed top-0 left-0 z-50 px-4 pt-3 bg-black/70 backdrop-blur-sm border-b border-gray-800 pb-3">
            <nav className="bg-transparent">
                <ul className="flex justify-evenly uppercase font-plex items-center">
                    <div className="w-1/3">
                        <Link href="/" className="text-xs w-[400px] cursor-pointer">Carla Bru</Link>
                    </div>
                    <div className="flex w-2/3 gap-3">
                        <Link href="/projects" className="navlist">Projects</Link>
                        {/* <Link href="/archive" className="navlist">Archive</Link> */}
                        <Link href="/information" className="navlist">Information + Contact</Link>
                    </div>
                    {
                        uid && (
                            <button className="text-xs" onClick={handleLogout}>Logout</button>)
                    }
                </ul>
            </nav>
        </header>
    );
}
