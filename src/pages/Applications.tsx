import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Applications() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            // Here you would typically send the email to your backend
            console.log('Email submitted:', email);
        }
    };

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden p-4">
            {/* Main heading */}
            <motion.h1
                className="font-syne text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-16 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                Applications Launching soon!
            </motion.h1>

            {/* Waitlist form container */}
            <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* "Join the waitlist!" text */}
                <motion.p
                    className="text-lg md:text-xl font-satoshi text-gray-400 mb-6 text-center tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    Join the waitlist!
                </motion.p>

                {/* Form box with gradient border effect */}
                <motion.div
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    {/* Gradient border glow */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

                    {/* Main form container */}
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 md:p-10 border border-gray-800 shadow-2xl">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full md:min-w-[400px] px-6 py-4 bg-black border-2 border-gray-700 rounded-lg 
                             text-white placeholder-gray-500 font-satoshi text-base
                             focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600/50
                             transition-all duration-300 hover:border-gray-600"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="px-8 py-4 bg-white text-black font-syne font-bold text-base uppercase tracking-wider rounded-lg
                           hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl
                           hover:scale-[1.02] active:scale-[0.98]"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Join Waitlist
                                </motion.button>
                            </form>
                        ) : (
                            <motion.div
                                className="text-center py-4"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="text-2xl mb-2">✓</div>
                                <p className="text-white font-syne font-semibold text-xl mb-2">
                                    You're on the list!
                                </p>
                                <p className="text-gray-400 font-satoshi text-sm">
                                    We'll notify you when applications open.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-gray-600/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
