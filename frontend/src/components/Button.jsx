export function Button({ label, onPress }) {
    return <div className="pt-3">
        <button className="bg-green-500 text-white rounded-md w-72 h-10 text-lg font-bold sm:font-semibold justify-center"
            onClick={onPress}>{label}</button>
    </div>
}