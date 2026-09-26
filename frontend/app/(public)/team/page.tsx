import MeetTheTeam from "@/components/team-members/MeetTheTeam";
import { teamMetadata } from "@/app/data/metadataExports";

export const metadata = teamMetadata;

export default function TeamPage() {
  return <MeetTheTeam />;
}
