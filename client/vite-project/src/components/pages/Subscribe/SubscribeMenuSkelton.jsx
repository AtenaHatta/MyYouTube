
function SubscribeMenuSkelton() {
  return (
    <div className="flow-root">
      <ul className="max-h-[500px] overflow-y-auto">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4 animate-pulse">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="h-2 bg-gray-300 rounded dark:bg-gray-700 mb-1"></div>
                <div className="h-2 bg-gray-300 rounded dark:bg-gray-700"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscribeMenuSkelton;
