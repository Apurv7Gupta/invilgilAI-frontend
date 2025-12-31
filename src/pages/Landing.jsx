import Navbar from "../components/Navbar";
import FeatureCarousel from "../components/FeatureCarousel";

function Landing() {
    return (
        <div className="min-h-screen bg-black from-gray-100 to-gray-400">
            <Navbar />

            {/* HERO TEXT */}
            <div className="px-12 mt-12">
                <p className="text-xl md:text-2xl font-medium text-white max-w-3xl leading-snug">
                    Real-time AI that sees, hears, and flags cheating
                    <br />
                    before it even starts.
                </p>
            </div>

            {/* FEATURE CARDS
            <div className="flex justify-between px-12 mt-24 gap-10">
                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        className="w-full h-60 rounded-2xl bg-white shadow-lg"
                    />
                ))}
            </div> */}

            {/* FEATURE CARDS */}
            <div className="px-0 mt-24">
                <FeatureCarousel />
            </div>
        </div>
    );
}

export default Landing;
