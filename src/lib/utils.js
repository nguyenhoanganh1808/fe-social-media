export function formatNumber(number) {
  const formattedNumber = number.toLocaleString(); // "1,984"
  return formattedNumber;
}

export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
}

export function getFileType(fileName) {
  // Get the part after the last dot
  return fileName.substring(fileName.lastIndexOf(".") + 1);
}

export function formatSize(sizeInKb) {
  if (!sizeInKb) return "";
  if (sizeInKb >= 1024) {
    const sizeInMb = sizeInKb / 1024;
    return `${sizeInMb.toFixed(2)} MB`;
  }
  return `${sizeInKb.toFixed(2)} KB`;
}

export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = (bytes / Math.pow(k, i)).toFixed(2);

  return `${size} ${units[i]}`;
}

export function formatTime(elapsedTime) {
  const minutes = String(Math.floor(elapsedTime / 60000)).padStart(1, "0");
  const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(
    2,
    "0"
  );
  const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(
    2,
    "0"
  );
  return `${minutes}:${seconds},${milliseconds}`;
}

export async function convertToFiles(defaultFiles) {
  const filePromises = defaultFiles.map(async (file) => {
    const response = await fetch(file.url);
    const blob = await response.blob();
    return new File([blob], `${file.fileName}`, {
      type: blob.type,
    });
  });

  return Promise.all(filePromises);
}

export function formatToTime(inputTimestamp) {
  const date = new Date(inputTimestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatRelativeTime(timestamp) {
  const date = new Date(timestamp);
  const now = Date.now(); // Current timestamp
  const difference = now - date; // Difference in milliseconds

  const seconds = Math.floor(difference / 1000); // Convert to seconds
  const minutes = Math.floor(seconds / 60); // Convert to minutes
  const hours = Math.floor(minutes / 60); // Convert to hours
  const days = Math.floor(hours / 24); // Convert to days
  const weeks = Math.floor(days / 7); // Convert to weeks

  if (seconds < 60) {
    return `${seconds}s`; // Less than a minute
  } else if (minutes < 60) {
    return `${minutes}m`; // Less than an hour
  } else if (hours < 24) {
    return `${hours}h`; // Less than a day
  } else if (days < 7) {
    return `${days}d`; // Less than a week
  } else {
    return `${weeks}w`; // More than a week
  }
}

export function extractFileFromUrlType(file) {
  if (!file || typeof file.fileName !== "string") {
    throw new Error("Invalid file object");
  }

  const extension = file.fileName.split(".").pop().toLowerCase();

  switch (extension) {
    case "pdf":
      return "pdf";
    case "docx":
      return "docx";
    case "pptx":
      return "pptx";
    case "zip":
      return "zip";
    case "doc":
      return "doc";
    case "rar":
      return "rar";
    case "txt":
      return "txt";
    default:
      return "unknown";
  }
}

export function extractFileType(file) {
  if (!file) {
    throw new Error("Invalid file object");
  }
  let extension;
  if (file.name) {
    extension = file.name.split(".").pop().toLowerCase();
  } else {
    extension = file.fileName.split(".").pop().toLowerCase();
  }

  switch (extension) {
    case "pdf":
      return "pdf";
    case "docx":
      return "docx";
    case "pptx":
      return "pptx";
    case "zip":
      return "zip";
    case "doc":
      return "doc";
    case "rar":
      return "rar";
    case "txt":
      return "txt";
    default:
      return "unknown";
  }
}

export function getFileIcon(type) {
  switch (type) {
    case "pdf":
      return "/icons/file/pdf.png";
    case "docx":
      return "/icons/file/docx.png";
    case "pptx":
      return "/icons/file/pptx.png";
    case "zip":
      return "/icons/file/zip.png";
    case "doc":
      return "/icons/file/doc.png";
    case "rar":
      return "/icons/file/rar.png";
    case "txt":
      return "/icons/file/txt.png";
    default:
      return "/icons/file/document.png";
  }
}

export function getCurrentMonth() {
  const currentDate = new Date();
  const displayMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(currentDate);
  return displayMonth;
}

export function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export async function setCookie(name, value, expiry) {
  const date = new Date(expiry);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; Secure`;
}

export async function cropImage(file, width, height) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // Crop from the center of the image
        const cropX = (img.width - width) / 2;
        const cropY = (img.height - height) / 2;

        ctx.drawImage(img, cropX, cropY, width, height, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              reject(new Error("Failed to crop image"));
            }
          },
          file.type,
          1.0
        );
      };

      img.onerror = reject;
      img.src = event.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function createUserProfile(user) {
  if (user.student) {
    return user.student.profile;
  } else if (user.lecturer) {
    return user.lecturer.profile;
  } else
    return {
      avatarUrl:
        "https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png",
      nickName: "Admin",
    };
}
