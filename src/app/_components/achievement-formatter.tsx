"use client";

import React, { useState } from "react";
import { Trophy, Copy, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";

export function AchievementFormatter() {
  const [achievement, setAchievement] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatter = api.achievement.format.useMutation();

  const handleFormat = async () => {
    if (!achievement.trim()) {
      toast.error("Please enter your achievement");
      return;
    }

    setIsLoading(true);

    try {
      const { formatted } = await formatter.mutateAsync({ text: achievement });
      setFormattedText(formatted);
      toast.success("Achievement formatted successfully!");
    } catch (error) {
      console.log("Error formatting achievement:", error);
      toast.error("Failed to format achievement. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formattedText);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-4">
        <label
          htmlFor="achievement"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your achievement
        </label>
        <textarea
          id="achievement"
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
          className="h-32 w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          placeholder="E.g., I managed a team of developers to build a new e-commerce platform..."
        />
        <button
          onClick={handleFormat}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Trophy className="h-5 w-5" />
          )}
          Format Achievement
        </button>
      </div>

      {formattedText && (
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Professional Format
            </h3>
            <button
              onClick={handleCopy}
              className="text-gray-600 transition-colors hover:text-gray-900"
              title="Copy to clipboard"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{formattedText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
