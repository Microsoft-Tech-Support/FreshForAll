export default function RetryReport({ onRetry, closeToast }) {
    const handleClick = () => {
        onRetry();
        closeToast();
    }

    return (
        <div>
            <h3 className={`text-lg font-medium`}>Error reporting offense. Try again or contact our help center to solve this issue.</h3>
            <button className={`bg-white mt-2 rounded-lg px-3 py-1 text-lg text-black w-full`} onClick={handleClick}>Try Again</button>
        </div>
    );
}