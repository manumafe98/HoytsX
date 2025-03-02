export const Footer = () => {
  return (
    <div className="flex justify-between items-center bg-[#121313] h-20 text-gray-500 mt-auto p-5">
      <h1 className="text-3xl font-bold">HoytsX</h1>
      <ul className="flex gap-2">
        <li>Copyright © {new Date().getFullYear()} National Amusements Inc. |</li>
        <li>Privacy policies |</li>
        <li>Book of complaints</li>
      </ul>
      <ul className="flex gap-2">
        <li>Instagram</li>
        <li>Facebook</li>
        <li>Twitter</li>
      </ul>
    </div>
  )
}
