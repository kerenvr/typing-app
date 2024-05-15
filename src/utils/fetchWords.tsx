export const fetchWords = async () => {
    const response = await fetch('/api/words');
    const data = await response.json();
    
    let tempArray = [];
    for (const wordObj of data) {
        const currWord = wordObj.words;
        tempArray.push(currWord);
    }
    return { tempArray } ;
}


