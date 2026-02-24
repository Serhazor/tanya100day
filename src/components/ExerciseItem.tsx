"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BarChart, Info } from "lucide-react";
import { useState } from "react";
import type { Exercise, Explanation } from "@/types";

interface Props {
    exercise: Exercise;
    explanation?: Explanation;
}

export default function ExerciseItem({ exercise, explanation }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-card text-card-foreground rounded-xl border overflow-hidden mb-3 hover:shadow-sm transition-shadow">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-4 flex items-center justify-between focus:outline-none focus:bg-secondary/50"
            >
                <div className="flex-1 pr-4">
                    <h3 className="font-medium text-[16px] leading-tight text-foreground">{exercise.name}</h3>
                    {exercise.reps !== null && (
                        <p className="text-sm text-primary font-medium mt-1">
                            Повторения: {exercise.reps}
                        </p>
                    )}
                </div>

                {explanation && (
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground">
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={18} />
                        </motion.div>
                    </div>
                )}
            </button>

            <AnimatePresence>
                {isOpen && explanation && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 border-t border-border mt-2 bg-secondary/20">
                            {explanation.difficulty !== null && (
                                <div className="flex items-center gap-2 mb-3 mt-3 text-sm font-medium text-foreground">
                                    <BarChart size={16} className="text-primary" />
                                    <span>Сложность: {explanation.difficulty} / 10</span>
                                </div>
                            )}
                            {explanation.description && (
                                <div className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                                    <Info size={16} className="text-accent flex-shrink-0 mt-0.5" />
                                    <p>{explanation.description}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
