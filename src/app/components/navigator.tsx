export default function Navigator() {
    return (
        <aside className="p-4 h-screen bg-gray-800 text-white hidden sm:block min-w-[180px] max-w-[180px] xl:min-w-[260px] max-w-[260px] ">
            <h2 className="text-lg font-bold mb-6">Skill Hub</h2>
            <nav className="space-y-2">
                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">1</a>
                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">2</a>
            </nav>
        </aside>
    );
}