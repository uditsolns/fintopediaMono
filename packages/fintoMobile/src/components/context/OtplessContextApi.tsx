import React, {createContext, ReactNode, useContext, useState} from 'react';

interface OtplessContextType {
  otp: string | number;
  setOtp: (otp: string) => void;
  phoneNumber: string | number;
  setPhoneNumber: (phone: string) => void;
  deviceId: string | null;
  setDeviceId: (phone: string) => void;
}

interface OtplessContextProviderProps {
  children: ReactNode;
}

const OtplessContext = createContext<OtplessContextType | undefined>(undefined);

export const OtplessContextProvider: React.FC<OtplessContextProviderProps> = ({
  children,
}) => {
  const [otp, setOtp] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string>('');

  return (
    <OtplessContext.Provider
      value={{
        otp,
        setOtp,
        phoneNumber,
        setPhoneNumber,
        deviceId,
        setDeviceId,
      }}>
      {children}
    </OtplessContext.Provider>
  );
};

export const useOtplessContext = () => {
  const context = useContext(OtplessContext);
  if (!context) {
    throw new Error(
      'useOtplessContext must be used within an OtplessContextProvider',
    );
  }
  return context;
};
