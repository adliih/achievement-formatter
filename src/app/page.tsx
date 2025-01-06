import { Trophy } from "lucide-react";
import { AchievementFormatter } from "~/app/_components/achievement-formatter";
import { Toaster } from "react-hot-toast";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Trophy className="h-10 w-10 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Achievement Formatter
              </h1>
            </div>
            <p className="mx-auto max-w-xl text-gray-600">
              Transform your achievements into professional LinkedIn work
              experience bullet points. Perfect for resumes and professional
              profiles.
            </p>
          </div>
          <AchievementFormatter />
        </div>
      </div>
    </HydrateClient>
  );
}
