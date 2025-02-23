// make a class called RulesForPawns
export class RulesForPawns {
    // constructor
    constructor(){

    }
    public moveIsAllowed(chessboard: HTMLTableElement, startSquare: HTMLElement, draggedPiece: HTMLElement, targetSquare: HTMLElement, targetPiece: HTMLElement | null): boolean {

        // Variable assignments
        let moveIsAllowed = false;
        let startSquareX: number = startSquare.dataset.x ? parseInt(startSquare.dataset.x || '0'): 0;
        let startSquareY: number = startSquare.dataset.y ? parseInt(startSquare.dataset.y || '0'): 0;
        let targetSquareX: number = targetSquare.dataset.x ? parseInt(targetSquare.dataset.x || '0'): 0;
        let targetSquareY: number = targetSquare.dataset.y ? parseInt(targetSquare.dataset.y || '0'): 0;
        let draggedPieceType: string = draggedPiece.dataset.piece ? draggedPiece.dataset.piece || "": "";
        let draggedPieceColor: string = draggedPiece.dataset.color ?  draggedPiece.dataset.color || "": "";
        let targetPieceType: string = targetPiece?.dataset.piece ? targetPiece?.dataset.piece || "": "";
        let targetPieceColor: string = targetPiece?.dataset.color ? targetPiece?.dataset.color || "": "";
        let diffX: number  = targetSquareX - startSquareX;
        let diffY: number  = targetSquareY - startSquareY;

        // Allowed movements
        if(draggedPieceColor == "white")
        {
            if(startSquareY == 2 && diffY == 2 && diffX == 0 && targetPieceType == ""){ // If the pawn is in the second row, it can advance 2 spaces, if those spaces are clear
                const cellAbove: HTMLElement | null = this.getCellAbove(startSquare as HTMLTableCellElement);
                if(cellAbove && !cellAbove.firstChild){
                    moveIsAllowed = true;
                }
            }
            else if(diffY == 1 && diffX == 0 && targetPieceType == ""){ // If the pawn advances one space, and the targetSquare is empty
                moveIsAllowed = true;
            }
            else if(diffY == 1 && (diffX == 1 || diffX == -1) && targetPieceType != "" && targetPieceColor != draggedPieceColor){
                moveIsAllowed = true;
            }
        }   
        else if(draggedPieceColor == "black")
        {
            if(startSquareY == 7 && diffY == -2 && diffX == 0 && targetPieceType == ""){ // If the pawn is in the second row, it can advance 2 spaces, if those spaces are clear
                const cellBelow: HTMLElement | null = this.getCellBelow(startSquare as HTMLTableCellElement);
                if(cellBelow && !cellBelow.firstChild){
                    moveIsAllowed = true;
                }
            }
            else if(diffY == -1 && diffX == 0 && targetPieceType == ""){ // If the pawn advances one space, and the targetSquare is empty
                moveIsAllowed = true;
            }
            else if(diffY == -1 && (diffX == 1 || diffX == -1) && targetPieceType != "" && targetPieceColor != draggedPieceColor){
                moveIsAllowed = true;
            }
        }

        return moveIsAllowed;
    }

    getCellAbove(td1: HTMLTableCellElement): HTMLTableCellElement | null {
        // Get the parent row
        const row = td1.parentElement as HTMLTableRowElement;
        if (!row) return null;
    
        // Get the table body (or table if tbody isn't used)
        const table = row.closest("table");
        if (!table) return null;
    
        // Get all rows in the table
        const rows = Array.from(table.rows);
        
        // Find the index of the current row
        const rowIndex = rows.indexOf(row);
        if (rowIndex <= 0) return null; // No previous row exists
    
        // Get the index of the td within its row
        const cells = Array.from(row.cells);
        const cellIndex = cells.indexOf(td1);
        if (cellIndex === -1) return null;
    
        // Get the previous row
        const prevRow = rows[rowIndex - 1];
    
        // Get the cell in the previous row at the same index
        return prevRow.cells[cellIndex] || null;
    }

    getCellBelow(td: HTMLTableCellElement): HTMLTableCellElement | null {
        const row = td.parentElement as HTMLTableRowElement;
        if (!row) return null;
    
        const table = row.closest("table");
        if (!table) return null;
    
        const rows = Array.from(table.rows);
        const rowIndex = rows.indexOf(row);
        if (rowIndex === -1 || rowIndex >= rows.length - 1) return null; // No next row exists
    
        const cellIndex = Array.from(row.cells).indexOf(td);
        if (cellIndex === -1) return null;
    
        const nextRow = rows[rowIndex + 1];
        return nextRow.cells[cellIndex] || null;
    }

    selectTakenWhitePiece(): Promise<HTMLImageElement | null> {
        return new Promise((resolve) => {
            const whitePiecesTaken = document.getElementById("whitePiecesTaken");
            if (!whitePiecesTaken) {
                console.error("whitePiecesTaken div not found.");
                resolve(null);
                return;
            }
    
            const images = Array.from(whitePiecesTaken.getElementsByTagName("img"));
            const uniqueSources = new Map<string, HTMLImageElement>();
    
            images.forEach(img => {
                if (!uniqueSources.has(img.src)) {
                    uniqueSources.set(img.src, img);
                }
            });
    
            // Create modal
            const modal = document.createElement("div");
            modal.id = "SelectWhite";
            modal.style.position = "fixed";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%, -50%)";
            modal.style.background = "white";
            modal.style.border = "1px solid black";
            modal.style.padding = "10px";
            modal.style.zIndex = "1000";
    
            const form = document.createElement("form");
    
            uniqueSources.forEach((img, src) => {
                const label = document.createElement("label");
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "pieceSelection";
                radio.value = src;
    
                radio.addEventListener("change", () => {
                    document.body.removeChild(modal);
                    resolve(images.find(i => i.src === src) || null);
                });
    
                label.appendChild(radio);
                const imgElement = document.createElement("img");
                imgElement.src = src;
                imgElement.style.width = "50px"; // Adjust size if needed
                imgElement.style.marginLeft = "5px";
    
                label.appendChild(imgElement);
                form.appendChild(label);
                form.appendChild(document.createElement("br"));
            });
    
            modal.appendChild(form);
            document.body.appendChild(modal);
        });
    }
    
    selectTakenBlackPiece(): Promise<HTMLImageElement | null> {
        return new Promise((resolve) => {
            const blackPiecesTaken = document.getElementById("blackPiecesTaken");
            if (!blackPiecesTaken) {
                console.error("blackPiecesTaken div not found.");
                resolve(null);
                return;
            }
    
            const images = Array.from(blackPiecesTaken.getElementsByTagName("img"));
            const uniqueSources = new Map<string, HTMLImageElement>();
    
            images.forEach(img => {
                if (!uniqueSources.has(img.src)) {
                    uniqueSources.set(img.src, img);
                }
            });
    
            // Create modal
            const modal = document.createElement("div");
            modal.id = "SelectBlack";
            modal.style.position = "fixed";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%, -50%)";
            modal.style.background = "white";
            modal.style.border = "1px solid black";
            modal.style.padding = "10px";
            modal.style.zIndex = "1000";
    
            const form = document.createElement("form");
    
            uniqueSources.forEach((img, src) => {
                const label = document.createElement("label");
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "pieceSelection";
                radio.value = src;
    
                radio.addEventListener("change", () => {
                    document.body.removeChild(modal);
                    resolve(images.find(i => i.src === src) || null);
                });
    
                label.appendChild(radio);
                const imgElement = document.createElement("img");
                imgElement.src = src;
                imgElement.style.width = "50px"; // Adjust size if needed
                imgElement.style.marginLeft = "5px";
    
                label.appendChild(imgElement);
                form.appendChild(label);
                form.appendChild(document.createElement("br"));
            });
    
            modal.appendChild(form);
            document.body.appendChild(modal);
        });
    }
}