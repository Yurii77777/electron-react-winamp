import DragAndDrop from '../../../UI/DragAndDrop/DragAndDrop';
import { useApp } from '../../../../providers/AppProvider';

export const Container = () => {
  const { form } = useApp();
  const { setValue, control } = form;

  return (
    <div className="flex-1 w-fullpx-2 pt-1 pl-1 pb-[10px] primary-gradient playlist-container-shadow">
      <div className="p-2 border-l-2 border-t-2 borger-gray-2 h-full drop-shadow">
        <div className="h-full bg-black">
          <DragAndDrop setValue={setValue} name="videos" control={control} />
        </div>
      </div>
    </div>
  );
};
