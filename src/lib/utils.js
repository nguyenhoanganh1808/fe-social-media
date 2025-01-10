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
  if (sizeInKb >= 1024) {
    const sizeInMb = sizeInKb / 1024;
    return `${sizeInMb.toFixed(2)} MB`;
  }
  return `${sizeInKb.toFixed(2)} KB`;
}

export function convertBytesToMegaBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
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
    return new File(
      [blob],
      `default_${file.type.toLowerCase()}.${blob.type.split("/")[1]}`,
      {
        type: blob.type,
      }
    );
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
