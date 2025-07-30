export function SubHeading({ text, className = "", darkMode }) {
    const defaultClass = `
        text-lg font-medium leading-relaxed
        ${darkMode ? 'text-slate-400' : 'text-gray-600'}
    `;

    return (
        <p className={`${defaultClass} ${className}`}>
            {text}
        </p>
    );
}