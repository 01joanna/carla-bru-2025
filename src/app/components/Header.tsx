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
                <ul className="flex justify-around uppercase gap-3 font-plex items-center">
                    <Link href="/" className="text-xs w-[400px] cursor-pointer">Carla Bru</Link>
                    <Link href="/projects" className="navlist opacity-40">Projects</Link>
                    <Link href="/index" className="navlist">Index</Link>
                    <Link href="/information" className="navlist">Information + Contact</Link>
                    {
                        uid && (
                            <button className="text-xs" onClick={handleLogout}>Logout</button>)
                    }
                </ul>
            </nav>
        </header>
    );
}
