import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

interface Props { }

const Button: React.FC<Props> = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true), [];
    });

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="bg-gray-800 fadeIn dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 px-2 py-2 text-2xl md:text-4xl rounded-lg"
        >
            {theme == "dark" ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default Button;
