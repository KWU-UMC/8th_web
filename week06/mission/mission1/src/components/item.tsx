import { LP } from "../types/lptype";

export default function Item({ item }: { item: LP }) {
  return <div className="w-50 h-50">{item.content}</div>;
}
