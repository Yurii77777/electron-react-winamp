import { Control, FieldValues, Path, UseFormSetValue } from 'react-hook-form';

export type DragDropFilesProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  className?: {
    parent?: HTMLLabelElement['className'];
  };
  disabled?: boolean;
};
