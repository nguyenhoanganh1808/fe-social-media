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
