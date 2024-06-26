import ExpertEditForm from "../_components/expert-edit";
import SupabaseReactDropzone from "../_components/supabase-react-dropzone";
import { currentUser } from "@/auth";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardSettingsProfile() {
  const expert = await currentUser();
  if (!expert) {
    return <div>Not logged in</div>;
  }

  return (
    <Card>
      <CardContent className="mt-4">
        <div className="flex flex-1 flex-col items-center gap-4 overflow-auto">
          <div className="mx-auto mt-4 grid w-full gap-2">
            <h2 className="text-3xl font-semibold">Image</h2>
          </div>
          <SupabaseReactDropzone userId={expert.id} />
          <div className="mx-auto mt-4 grid w-full gap-2">
            <h2 className="text-3xl font-semibold">Name</h2>
          </div>
          <div className="flex w-full flex-col justify-between gap-4 rounded-md bg-muted/50 px-6 py-4 lg:flex-row">
            <div className="flex items-center gap-x-6">
              <div>
                <ExpertEditForm id="name" name="name" placeholder={expert.name ?? "Your name"} />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-4 grid w-full gap-2">
            <h2 className="text-3xl font-semibold">About Us</h2>
          </div>
          <div className="mx-auto mt-4 grid w-full gap-2">
            <ExpertEditForm id="bio" name="bio" placeholder={expert.bio ?? "Your Bio"} />
          </div>
          <div className="mx-auto mt-4 grid w-full gap-2">
            <h2 className="text-3xl font-semibold">Availability</h2>
            <CardDescription>
              If you want to make changes to your Booking page, go to your{" "}
              <Link href="/dashboard/settings/availability" className="underline">
                Availability
              </Link>{" "}
              settings.
            </CardDescription>
          </div>
          {/* FIX: this currently doesn't work as there are then two `<CalProvider />` instantiated (leads to queryclient conflict) */}
          {/* <div className="w-full overflow-hidden [&_.calcom-atoms]:bg-[transparent]">
            <div className="rounded-md border md:-ml-[80px] md:scale-75">
              {Boolean(expert.calAccount) && (
                <div className="pointer-events-none">
                  <ExpertBooker
                    calAccessToken={expert.calAccessToken}
                    calAccount={expert.calAccount!}
                    expert={expert}
                  />
                </div>
              )}
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
