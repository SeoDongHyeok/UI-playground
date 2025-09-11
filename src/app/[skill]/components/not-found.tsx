"use client"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="text-center">
                <div className="text-6xl mb-4">😕</div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    찾을 수 없는 스킬이에요
                </h1>
                <p className="text-gray-500 mb-6">
                    다른 스킬을 검색해보시겠어요?
                </p>
                <button
                    onClick={() => history.go(-1)}
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                    뒤로 가기
                </button>
            </div>
        </div>
    );
}