export default function roomfn(room) {
  room.onMessage(message => {
    console.log(message);
  });
}
