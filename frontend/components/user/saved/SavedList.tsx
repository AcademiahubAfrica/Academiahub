import { ResearchCardType } from "@/app/_types/documents";
import ResearchCard from "@/components/user/dashboard/ResearchCard";
import EmptySection from "@/components/user/notifications/EmptySection";

interface SavedListProps {
  documents: ResearchCardType[];
  likedDocumentIds: Set<string>;
  onSaveToggle: (documentId: string) => (isSaved: boolean) => void;
}

const SavedList = ({
  documents,
  likedDocumentIds,
  onSaveToggle,
}: SavedListProps) => {
  return (
    <div className="lg:px-6.25">
      {documents.length ? (
        <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {documents.map((data) => (
            <ResearchCard
              key={data.id}
              data={data}
              isLiked={likedDocumentIds.has(data.id as string)}
              isSaved={true}
              onSaveToggle={onSaveToggle(data.id as string)}
            />
          ))}
        </section>
      ) : (
        <EmptySection
          title="No saved publications yet"
          text="Materials you save will appear here for easy access"
          text="Materials you save will appear here for easy access"
        />
      )}
    </div>
  );
};

export default SavedList;
