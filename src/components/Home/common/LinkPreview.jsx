export default function LinkPreview() {
  return (
    <>
      <p className="text-sm font-normal pb-2.5 text-gray-900 dark:text-white">
        <a
          href="https://github.com/themesberg/flowbite"
          className="text-blue-700 dark:text-blue-500 underline hover:no-underline font-medium break-all"
        >
          https://github.com/themesberg/flowbite
        </a>
      </p>
      <a
        href="#"
        className="bg-gray-50 dark:bg-gray-600 rounded-xl p-4 mb-2 hover:bg-gray-200 dark:hover:bg-gray-500"
      >
        <img
          src="https://flowbite.com/docs/images/og-image.png"
          className="rounded-lg mb-2"
        />
        <span className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          GitHub - themesberg/flowbite: The most popular and open source libra
          ...
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
          github.com
        </span>
      </a>
    </>
  );
}
