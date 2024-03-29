import { FC, MouseEventHandler, useState } from "react";
import { TrClass } from "../../../interfaces/trClass";
import { Popconfirm } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../lib/config";
import { useCurrentUser } from "../../../lib/hooks/auth";
import { Role } from "../../../lib/utils";

interface Props {
  trClass: TrClass;
  onEdit: MouseEventHandler<HTMLButtonElement>;
}

const SingleClassTileActions: FC<Props> = ({ trClass, onEdit }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await deleteDoc(doc(firestore, "classes", trClass.id));
    setLoading(false);
    setShowPopup(false);
  };

  const { role } = useCurrentUser();
  return (
    <div className="flex space-x-2">
      {(role === Role.Admin || role === Role.PoManager) && (
        <button className="w-6 h-6 " onClick={onEdit}>
          <img src="/icons/edit.svg" />
        </button>
      )}
      {role === Role.Admin && (
        <Popconfirm
          title="Remove this class ?"
          description="Are you sure want to remove this class on timetable?"
          open={showPopup}
          onConfirm={handleConfirm}
          okButtonProps={{ loading, danger: true }}
          onCancel={() => setShowPopup(false)}
        >
          <button onClick={() => setShowPopup(true)}>
            <img src="/icons/delete.svg" />
          </button>
        </Popconfirm>
      )}
    </div>
  );
};

export default SingleClassTileActions;
