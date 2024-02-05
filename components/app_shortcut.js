import Image from "next/image";

export default function ApplicationShortcut({image_url, link, name}) {
  return (
    <div className="flex flex-col border justify-center items-center h-48 w-48">
      <div className="flex h-3/4 justify-center items-center bg-white-100 w-full">
        <Image
          src={image_url}
          alt={name}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-grow"></div>
      <div className="flex h-1/4 items-center justify-center bg-black-900 text-white-100 w-full hover:bg-primary hover:text-white-100 hover:cursor-pointer border-t border-white-100">
        <a href={link} target="_blank" rel="noopener noreferrer">{name}</a>
      </div>
    </div>
  );
}
