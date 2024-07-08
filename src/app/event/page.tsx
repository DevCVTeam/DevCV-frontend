import { getEvents } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import EventList from './_components/EventList';

export default async function EventPage() {
  const user = await getServerSession(authOptions);
  const events = await getEvents(user?.user.accessToken!);
  return (
    <div>
      <EventList events={events!} />
    </div>
  );
}
