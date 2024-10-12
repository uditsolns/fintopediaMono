import { useRouter } from "next/navigation";
import React, { ReactNode, useState, useEffect } from "react";

interface ButtonWithIconsProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label: string;
  path?: string; 
}

const ButtonWithIcons: React.FC<ButtonWithIconsProps> = ({
  leftIcon,
  rightIcon,
  label,
  path,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    router.push(path);
  };

  useEffect(() => {
    const handleComplete = () => setIsLoading(false);
    return () => {
      handleComplete();
    };
  }, []);

  return (
    <div className="buttonStyles">
      <button
        className="button"
        onClick={handleNavigation}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loader">Loading...</span>
        ) : (
          <>
            {leftIcon && <span className="icon left-icon">{leftIcon}</span>}
            {label}
            {rightIcon && <span className="icon right-icon">{rightIcon}</span>}
          </>
        )}
      </button>

      <style jsx>{`
        .button {
          padding: 16px 24px;
          gap: 8px;
          border-radius: 4px;
          background: ${isLoading
            ? "#f0f0f0"
            : "#fff"}; /* Change background on load */
          color: #000;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          letter-spacing: -0.16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          width: auto;
          white-space: nowrap;
          opacity: ${isLoading ? 0.7 : 1}; /* Lower opacity during loading */
        }

        .button:disabled {
          cursor: not-allowed;
        }

        .icon {
          font-size: 20px;
          display: flex;
          align-items: center;
        }

        .left-icon {
          margin-right: 8px;
        }

        .right-icon {
          margin-left: 8px;
        }

        .loader {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default ButtonWithIcons;
