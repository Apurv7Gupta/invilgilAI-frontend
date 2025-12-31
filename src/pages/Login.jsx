import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
    const { loginWithRedirect, isLoading } = useAuth0();

    if (isLoading) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
            <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-gray-800 shadow-xl p-8">

                {/* Logo */}
                <h1
                    className="text-3xl font-semibold text-center text-[#5B6CFF]"
                    style={{ fontFamily: "'Expletus Sans', sans-serif" }}
                >
                    InvigilAI
                </h1>

                <p className="text-center text-gray-400 mt-2">
                    Login to your account
                </p>

                {/* AUTH BUTTONS */}
                <div className="mt-8 space-y-4">

                    {/* Email / Password (Auth0 handles UI after redirect) */}
                    <button
                        onClick={() => loginWithRedirect()}
                        className="w-full bg-[#5B6CFF] text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Login with Email
                    </button>

                    {/* Google Login */}
                    <button
                        onClick={() =>
                            loginWithRedirect({
                                authorizationParams: {
                                    connection: "google-oauth2",
                                },
                            })
                        }
                        className="w-full bg-gray-800 text-white py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition"
                    >
                        Continue with Google
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-[#5B6CFF] font-medium hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;


