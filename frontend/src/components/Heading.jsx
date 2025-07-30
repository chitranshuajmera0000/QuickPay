export function Heading({label, className = "", darkMode}) {
    const defaultClass = `
        font-black text-4xl md:text-5xl tracking-tight
        bg-gradient-to-r bg-clip-text text-transparent
        ${darkMode 
            ? 'from-purple-400 via-pink-400 to-indigo-400' 
            : 'from-indigo-600 via-purple-600 to-pink-600'
        }
        drop-shadow-lg
    `;

    return (
        <h1 className={`${defaultClass} ${className}`}>
            {label}
        </h1>
    );
}