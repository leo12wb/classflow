export default function ProgressBar({ percentage, showLabel = true, size = 'md' }) {
    const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
    const colorClass = percentage === 100
        ? 'bg-green-500'
        : percentage >= 50
        ? 'bg-blue-500'
        : 'bg-blue-400';

    return (
        <div>
            {showLabel && (
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Progresso</span>
                    <span className={`text-xs font-semibold ${percentage === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                        {percentage}%
                    </span>
                </div>
            )}
            <div className={`w-full bg-gray-200 rounded-full ${heights[size]}`}>
                <div
                    className={`${heights[size]} rounded-full transition-all duration-500 ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
