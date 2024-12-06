import apiUrl from "../../config/apiUrl";
import { toast } from "react-toastify";

export const DownloadCertificate = (certificateId: number): void => {
  const downloadUrl: string = `${apiUrl.DOWNLOAD_CERTIFICATE.GET}/${certificateId}`;
  const link: HTMLAnchorElement = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  link.click();
};

export const CopyToClipboard = (certificateId: number) => {
  const certificateUrl = `${apiUrl.DOWNLOAD_CERTIFICATE.GET}/${certificateId}`;
  navigator.clipboard
    .writeText(certificateUrl)
    .then(() => {
      toast.success("URL copied to clipboard!", {
        position: "top-right",
        theme: "light",
      });
    })
    .catch((err) => {
      toast.error("Error copying URL", {
        position: "top-right",
        theme: "light",
      });
      console.error("Error copying URL: ", err);
    });
};
