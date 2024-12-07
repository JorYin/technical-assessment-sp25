interface cardProps {
  name: string;
  artist: string;
  link: string;
  imageLink: string;
}

const MusicCard = ({ name, artist, link, imageLink }: cardProps) => {
  return (
    <a href={link} target="_blank">
      <div className="max-w-md p-4 relative transition duration-500 hover:scale-105 rounded-lg cursor-pointer">
          <img
            className="rounded-lg object-cover w-full h-full"
            src={imageLink}
            alt={name}
          />
          <div className="mt-2">
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-xl font-bold">By: {artist}</p>
          </div>
      </div>
    </a>
  );
};

export default MusicCard;
