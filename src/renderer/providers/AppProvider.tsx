import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

interface AppContextType {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  form: UseFormReturn<any>;
}

const AppContext = createContext<AppContextType>({
  selectedFile: null,
  setSelectedFile: () => null,
  form: {} as UseFormReturn<any>,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm({
    mode: 'onSubmit',
  });

  return (
    <AppContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        form,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
