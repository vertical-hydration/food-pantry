import { UserIcon } from "@heroicons/react/24/outline";




export function UserImage({
  src,

}: { src?: string; }) {

  const user = { image: src }; // Mock user object

  return (
    <>
      {
        user?.image ?
          <img
            alt={"user icon"}
            src={user.image}
            className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
          />
          :
          <UserIcon className="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5" />
      }
    </>
  );
}
