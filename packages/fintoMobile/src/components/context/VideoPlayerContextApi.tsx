import React, {createContext, useState, ReactNode, useContext} from 'react';

interface VideoPlayerContextType {
  videoPlayerUrl?: any;
  setVideoPlayerUrl?: React.Dispatch<React.SetStateAction<any>>;
  playVideoStartLoading?: boolean;
  setPlayVideoStartLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  videoPlayerBeforePurchaseUrl?: any;
  setVideoPlayerBeforePurchaseUrl?: React.Dispatch<React.SetStateAction<any>>;
  playVideoStartBeforePurchaseLoading?: boolean;
  setPlayVideoStartBeforePurchaseLoading?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const VideoPlayerContext = createContext<
  VideoPlayerContextType | undefined
>(undefined);

interface VideoPlayerContextProviderProps {
  children: ReactNode;
}

export const VideoPlayerContextProvider: React.FC<
  VideoPlayerContextProviderProps
> = ({children}) => {
  const [videoPlayerUrl, setVideoPlayerUrl] = useState<any>(null);
  const [playVideoStartLoading, setPlayVideoStartLoading] =
    useState<boolean>(false);
  const [videoPlayerBeforePurchaseUrl, setVideoPlayerBeforePurchaseUrl] =
    useState<any>(null);
  const [
    playVideoStartBeforePurchaseLoading,
    setPlayVideoStartBeforePurchaseLoading,
  ] = useState<boolean>(false);
  return (
    <VideoPlayerContext.Provider
      value={{
        videoPlayerUrl,
        setVideoPlayerUrl,
        playVideoStartLoading,
        setPlayVideoStartLoading,
        videoPlayerBeforePurchaseUrl,
        setVideoPlayerBeforePurchaseUrl,
        playVideoStartBeforePurchaseLoading,
        setPlayVideoStartBeforePurchaseLoading,
      }}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayerContext = () => {
  const context = useContext(VideoPlayerContext);
  return context;
};
