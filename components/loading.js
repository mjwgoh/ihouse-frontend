import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingPage() {
  const messages = [
    "spinning violently around (0,0). not that it makes any difference in terms of how fast this page loads.",
    "twiddling thumbs...",
    "please wait while the intern refills his coffee...",
    "you're getting paid while you wait. who said uchicago was hard?",
    "calculating the optimal coffee-to-study ratio...",
    "rerouting squirrels to the main quad... (this may take a while)",
    "replacing the robot with a squirrel...",
    "replacing the squirrel with a robot...",
    "figuring out how to render this page. pulling books from the reg now. please wait...",
    "digging through the archives to find where fun was last seen at uchicago... its supposed to be somewhere near ihouse.. hold please",
    "organizing a search party for lost fun at the main quad. forming theories on its mysterious disappearance. please hold...",
    "searching for fun at the reg... hold please",
    "searching for fun at the main quad... hold please",
    "creating fun at ihouse... hold please",
    "i ran out of fun. please wait while i go get some more...",
    "i ran out of loading messages. please wait while i go get some more...",
    "engaging in a staring contest with the robot...",
    "engaging in a staring contest with the squirrel...",
    "engaging in a philosophical debate with the server. please hold...",
    "instructing the campus squirrels on proper acorn storage techniques. the answer is aws s3. please hold...",
    "counting the bricks on campus buildings... please hold...",
    "counting the bricks on the main quad... please hold...",
    "asking the resident ghosts at cobb hall for loading speed secrets. spooky...",
    "brewing the perfect coffee blend at ex lib for optimal loading speed...",
    "this page was coded by someone from *****western. that's why it's so slow... please hold...",
    "waiting for wifi at the reg. please hold...",
    "waiting for a free whiteboard at the reg. please hold...",
    "waiting for a free rack at ratner. please hold...",
    "what advice does a wisdom tooth have? how should i know? i'm just a loading page...",
    "choose your own adventure. you are a loading page. you are stuck in an infinite loop. please hold...",
    "analyzing the mysteries of the Scav Hunt list... can you find bigfoot's toenail clippings' yet?",
    "analyzing the half-life of a coffee cup at the Reg... it's longer than you'd think",
    "consulting the UChicago weather algorithm for the most unpredictable forecasts... stay prepared for anything",
    "trying to locate the secret entrance to the tunnels beneath campus... or at least get a good rumor going about it",
    "consulting the oracle of hyde park for speedy loading wisdom...",
    "gathering quantum bits to speed up this page load...",
    "temporarily lost in the stacks of mansueto library. hold, please...",
    "asking the regenstein gargoyles for faster internet. please wait...",
    "negotiating with the campus wifi for extra speed. hold tight...",
    "synchronizing with the midway plaisance clock for timely loading...",
    "dusting off ancient floppy disks for loading instructions...",
    "running a marathon around the quads for faster page speed...",
    "bargaining with the coffee gods for a caffeine boost to this page...",
    "hitching a ride on a campus shuttle for quicker loading...",
    "asking the campus squirrels for loading speed tips...",
    "luring uchicago bunnies to speed up the server. please wait...",
    "training campus pigeons as messenger carriers for faster data transfer...",
    "brewing a magical tech elixir in the eckhardt research center labs for speedy loading...",
    "waiting for a free outlet at the reg. stand by...",
    "racing against the uchicago track team for faster page loads...",
    "tapping into the power of the chicago wind for faster processing...",
    "negotiating with the hyde park squirrels for a quicker load time...",
    "baking cookies at the dining hall to bribe the server for speed...",
    "waiting for a sunny day in chicago to solar power this load...",
    "conducting a scavenger hunt across campus for missing speed bytes...",
    "creating a mathematical model for optimal page loading at eckhardt...",
    "asking the rockefeller chapel carillonneur for a melody to hasten loading...",
    "waiting for a break in chicago's unpredictable weather for stable connection...",
    "organizing a philosophy discussion at cobb for deeper understanding of loading...",
    "bargaining with the reg's study carrels for quiet and quick loading...",
  ];

  function getRandomString(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    setRandomMessage(getRandomString(messages));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black-900">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-row items-center justify-center pb-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white-900"></div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="text-2xl text-white-100">{randomMessage}</div>
        </div>
      </div>
      <div className="flex align-bottom w-screen justify-center pb-10">
        <Image
          src={"/img/UChicago_IHO_Horizontal_White RGB.png"}
          layout="responsive"
          width={290}
          height={71}
          className="max-w-xs"
        ></Image>
      </div>
    </div>
  );
}
