export default function Events({
  params: { eventId }
}: {
  params: { eventId: string };
}) {
  return <div>{eventId}</div>;
}
