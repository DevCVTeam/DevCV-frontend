export default function ResumePending({
  params: { resumeId }
}: {
  params: { resumeId: string };
}) {
  return <div>{resumeId}</div>;
}
