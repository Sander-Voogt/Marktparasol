const SkeletonCardDetails = () => {
  return (
    <div className="flex flex-col gap-1 my-4 transition-all duration-150 ease-in-out">
      <div className="h-4 bg-neutral-200 rounded-md w-1/4 animate-pulse mb-1"></div>
      <div className="pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-neutral-100 border rounded-lg appearance-none border-neutral-300 animate-pulse" />
    </div>
  )
}

export default SkeletonCardDetails
