import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="max-w-4xl mx-auto p-3 border-teal-500 border rounded-tl-xl rounded-br-xl flex flex-col sm:flex-row">
      <div className="flex-1 self-center">
        <p className="text-2xl text-center">Want to learn Javascript?</p>
        <p className="text-[gray] my-2 text-center">Checkout these courses</p>
        <Button gradientDuoTone="purpleToPink" className="w-full">
          <a href="http://google.com" target="_blank" rel="noopener noreferrer">
            Click to preview
          </a>
        </Button>
      </div>
      <div className="p-3 flex-1">
        <img src="https://cdn.pixabay.com/photo/2024/04/02/04/37/coding-8670014_1280.png"></img>
      </div>
    </div>
  );
};

export default CallToAction;
