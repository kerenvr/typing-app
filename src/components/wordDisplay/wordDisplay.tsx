
interface WordDisplayProps {
    words: string;
    charsTyped: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ words, charsTyped}) => {

    return (
        <div>
            <p>
                {words.split('').map((char, index) => {
                    let color;
                    let bgColor;
                    if (index < charsTyped.length) {
                        color = char === charsTyped[index] ? '#6366f1' : 'white';
                        bgColor = char === charsTyped[index] ? 'transparent' : '#f87171'; 

                    }
                    return (
                        <span key={index} 
                              style={{ 
                                backgroundColor: bgColor,
                                color,
                            
                                padding: '2px',
                                }}>
                            {char}
                            {index === charsTyped.length - 1 && <span className="cursor"></span>}
                        </span>
                    );
                })}
            </p>
        </div>
    );
};

export default WordDisplay;