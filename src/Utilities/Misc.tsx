
export function sortSectionEntries (arrayToSort : any[]) {

    let sortedArray : any[] = [];

    arrayToSort.sort(({ sortorder }, { sortorder: sortorderb }) => sortorder - sortorderb).map(
        (item) => (
           
            sortedArray.push(item)
           
        )
    )     
    
    return (sortedArray);
}