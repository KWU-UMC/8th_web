import type { itemProps } from "../types/itemProps";

export default function Item({ item }: { item: itemProps }) {
  return (
    <div className="flex w-3/5 gap-5">
      <img
        className="w-30 h-30 rounded-xl object-cover"
        src={item.img}
        alt="Album Cover"
      />
      <div className="flex-1 p-4 justify-between flex items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl">{item.title}</h2>
          <span className="font-medium text-gray-700">{item.singer}</span>
          <span className="font-bold">{item.price}₩</span>
        </div>
        <div className="flex">
          <button className="cursor-pointer bg-gray-300 w-10 h-10 rounded-md">
            -
          </button>
          <p className="w-10 h-10 flex justify-center items-center bg-white border-2 border-gray-300 rounded-md">
            {item.amount}
          </p>
          <button className="cursor-pointer bg-gray-300 w-10 h-10 rounded-xl">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
