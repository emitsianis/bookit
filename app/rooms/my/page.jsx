import getMyRooms from '@/app/actions/getMyRooms';
import Heading from '@/app/components/Heading';
import MyRoomCard from '@/app/components/MyRoomCard';

const MyRoomsPage = async () => {
  const rooms = await getMyRooms();

  return (
    <>
      <Heading title="My Rooms" />
      {
        rooms?.length
          ? rooms.map((room) => <MyRoomCard room={room} key={room.$id} />)
          : <p>You have no room listings.</p>
      }
    </>
  );
};

export default MyRoomsPage;
