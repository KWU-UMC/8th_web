import { LP } from "../types/lp_type";

export default function LPItem({ item }: { item: LP }) {
  return (
    <div>
      <div>Title: {item.title}</div>
      <div>Content: {item.content}</div>
    </div>
  );
}
