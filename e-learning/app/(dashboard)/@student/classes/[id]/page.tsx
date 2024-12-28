import ClassesDetailPage from "../[id]/ClassesDetailPage";

export default async function Page({ params }: { params: { id: string } }) {
  return <ClassesDetailPage classId={params.id} />;
}
