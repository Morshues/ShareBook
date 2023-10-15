import { Avatar } from "@nextui-org/react";

import { AccountBookSharer } from "@/types/AccountBookSharer";
import { AccountBookItem } from "@/types/AccountBookItem";

type AccountBookItemListProps = {
  sharerList: AccountBookSharer[];
  item: AccountBookItem;
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

function AccountBookItemDetail({ sharerList, item }: AccountBookItemListProps) {

  return (
    <div className="p-4 m-2 border rounded-md shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-2">{item.name}</h2>
      <p className="text-gray-400 mb-2">{item.description}</p>
      <p className="text-gray-400 mb-2"><strong>Value:</strong> ${item.value}</p>
      <p className="text-gray-400 mb-2"><strong>Purchased At: </strong> {formatDate(item.purchasedAt)}</p>
      <p className="text-gray-400 mb-2"><strong>Purchased Place: </strong>{item.purchasedPlace || '(no data)'}</p>
      <div className="grid grid-cols-3 items-center text-center justify-center">
        {sharerList.map(sharer => (
          <Avatar
            key={sharer.id}
            size="sm"
            src={sharer.userImg}
            className="justify-self-center"
          />
        ))}
        {sharerList.map(sharer => (
          <span key={sharer.id}>{item.flows.find(flow => flow.sharerId === sharer.id)?.value || 0}</span>
        ))}
      </div>
    </div>
  )
}

export default AccountBookItemDetail;