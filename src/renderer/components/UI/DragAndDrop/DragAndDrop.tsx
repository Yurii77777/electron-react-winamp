import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { useApp } from '../../../providers/AppProvider';
import { DragDropFilesProps } from './interfaces';

import {
  ACCEPTED_AUDIO_FORMATS,
  DROPZONE_INPUT_NAME,
} from '../../../constants/common.constants';
import { formatDuration } from '../../Player/helpers.player';

const DragAndDrop = <T extends FieldValues>({
  name,
  control,
  setValue,
  className,
}: DragDropFilesProps<T>) => {
  const [fileDurations, setFileDurations] = useState<{ [key: string]: string }>(
    {},
  );

  const { setSelectedFile } = useApp();

  const onDrop = async (files: File[]) => {
    setValue(name, files as PathValue<T, Path<T>>);

    const durations = await Promise.all(
      files.map(async (file) => ({
        [file.name]: await formatDuration(file),
      })),
    );

    const formattedDurations = durations.reduce(
      (acc, duration) => ({ ...acc, ...duration }),
      {},
    );

    setFileDurations(formattedDurations);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_AUDIO_FORMATS,
    useFsAccessApi: false,
    multiple: true,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => {
        const uploadedFiles = (field.value as File[]) || [];

        return (
          <label
            {...field}
            htmlFor={DROPZONE_INPUT_NAME}
            {...getRootProps({
              className: twMerge(
                'relative flex h-full w-full cursor-pointer items-center justify-center bg-transparent',
                isDragActive &&
                  'border-2 border-green-1 border-dashed cursor-grabbing',
                className?.parent,
                errors?.[name]?.message && 'border border-red-1',
              ),
            })}
          >
            <ul className="flex flex-col w-full h-full font-dogica text-sm text-green-1 p-1">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between cursor-default select-none"
                  onDoubleClick={() => setSelectedFile(file)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="truncate w-3/4">
                    {index + 1}. {file.name}
                  </p>

                  <p>{fileDurations[file.name] || 'Loading...'}</p>
                </li>
              ))}
            </ul>

            <input {...getInputProps()} />
          </label>
        );
      }}
    />
  );
};

export default DragAndDrop;
