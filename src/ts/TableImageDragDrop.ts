import { RulesForPawns } from "./Rules/RulesForPawns";
import { RulesForRooks } from "./Rules/RulesForRooks";
import { RulesForKnights } from "./Rules/RulesForKnights";
import { RulesForBishops } from "./Rules/RulesForBishops";
import { RulesForQueens } from "./Rules/RulesForQueens";

export class TableImageDragDrop {

    // Things we need to remember
    private table: HTMLTableElement;
    private draggedPiece: HTMLElement | null = null;
    private startSquare: HTMLElement | null = null;
    private rulesForPawns: RulesForPawns | null = null;
    private rulesForRooks: RulesForRooks | null = null;
    private rulesForKnights: RulesForKnights | null = null;
    private rulesForBishops: RulesForBishops | null = null;
    private rulesForQueens: RulesForQueens | null = null;

    private tableIndex: (HTMLElement | null)[][] | null = null;

    // Prepare the chessboard
    constructor(tableId: string) {

        // Remember the table we are using for our chessboard
        this.table = document.getElementById(tableId) as HTMLTableElement;
        this.indexTable();
        this.rulesForPawns = new RulesForPawns();
        this.rulesForRooks = new RulesForRooks();
        this.rulesForKnights = new RulesForKnights();
        this.rulesForBishops = new RulesForBishops();
        this.rulesForQueens = new RulesForQueens();
        this.init();
    }    


    private indexTable() {
        this.tableIndex = Array.from({ length: 10 }, () => Array(10).fill(null));

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const id = `square${x}${y}`;
                const element = document.getElementById(id);
                this.tableIndex[x][y] = element; // Store the element or null if not found
            }
        }


        
        console.log(this.tableIndex);

        const elementAt11 = this.tableIndex[1][1];

        if (elementAt11) {
            console.log(elementAt11.id);
        } else {
            console.log("No element found at (1,1)");
        }
            
    }

    private init(): void {
        // Listen for drag and drop actions
        this.table.querySelectorAll("td").forEach(td => {
            td.setAttribute("draggable", "true");
            td.addEventListener("dragstart", this.handleDragStart.bind(this));
            td.addEventListener("dragover", this.handleDragOver.bind(this));
            td.addEventListener("drop", this.handleDrop.bind(this));
        });
    }

    // When starting to drag a piece
    private handleDragStart(event: DragEvent): void {
        const target = event.target as HTMLElement;
        if (target) {
            // Remember the draggedPiece and the startSquare
            this.draggedPiece = target;
            this.startSquare = target.parentElement;
        }
    }

    // When dragging a piece over a square
    private handleDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    // When dropping a piece
    private handleDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();

        // Remember the targetSquare
        const targetSquare = (event.target as HTMLElement).closest("td");

        // Cancel function if
        if (!targetSquare || targetSquare == this.startSquare) return;

        // Print what is happening
        if(this.startSquare && this.draggedPiece && targetSquare){
            console.log(`Dragging a ${this.draggedPiece.dataset.color} ${this.draggedPiece.dataset.piece} from ${this.startSquare.dataset.x},${this.startSquare.dataset.y} to ${targetSquare.dataset.x},${targetSquare.dataset.y}`);
        }

        // Get the target piece, if there it exists
        let targetPiece: HTMLElement | null = null;
        if(targetSquare.firstChild){
            // Get the targetPiece
           targetPiece = targetSquare.firstChild as HTMLElement;
        }

        // See if the move is allowed
        const draggedPieceType = this.draggedPiece?.dataset.piece;
        let moveIsAllowed = false;
        switch (draggedPieceType){
            case "pawn":
                if(this.rulesForPawns && this.startSquare && this.draggedPiece){
                    moveIsAllowed = this.rulesForPawns.moveIsAllowed(this.table, this.startSquare, this.draggedPiece, targetSquare, targetPiece);
                }
                break;
            case "rook":
                if(this.rulesForRooks && this.startSquare && this.draggedPiece){
                    moveIsAllowed = this.rulesForRooks.moveIsAllowed(this.tableIndex, this.startSquare, this.draggedPiece, targetSquare, targetPiece);
                }
                break;
            case "knight":
                if(this.rulesForKnights && this.startSquare && this.draggedPiece ){
                    moveIsAllowed = this.rulesForKnights.moveIsAllowed(this.tableIndex, this.startSquare, this.draggedPiece, targetSquare, targetPiece);
                }
                break;
            case "bishop":
                if(this.rulesForBishops && this.startSquare && this.draggedPiece ){
                    moveIsAllowed = this.rulesForBishops.moveIsAllowed(this.tableIndex, this.startSquare, this.draggedPiece, targetSquare, targetPiece);
                }
                break;
            case "queen":
                if(this.rulesForQueens && this.startSquare && this.draggedPiece ){
                    moveIsAllowed = this.rulesForQueens.moveIsAllowed(this.tableIndex, this.startSquare, this.draggedPiece, targetSquare, targetPiece);
                }
                break;
        }

        // If the move is allowed
        if(moveIsAllowed){

            // Move the target piece to the box for storing taken pieces
            if(targetPiece){
                // Get the targetPiece
                const targetPiece: HTMLElement = targetSquare.firstChild as HTMLElement;
                if(targetPiece.dataset.color) {
                    // Use the color of the taken piece to build the name of the box for storing taken pieces
                    const piecesTakenContainerName: string = `${targetPiece.dataset.color}PiecesTaken`;
                    // Move the taken piece
                    document.getElementById(piecesTakenContainerName)?.appendChild(targetPiece);
                    // Print what is happening
                    console.log(`Target square had a ${targetPiece.dataset.color} ${targetPiece.dataset.piece}. Moved the ${targetPiece.dataset.color} ${targetPiece.dataset.piece} from ${targetSquare.dataset.x},${targetSquare.dataset.y} to ${piecesTakenContainerName}`);
                }
            }
            else {
                console.log("Target square did not have a piece");
            }
            
            // Move the dragged piece to the target square
            if (this.draggedPiece) {
                targetSquare.appendChild(this.draggedPiece);
            }

            // if a white pawn reaches the other side of the board
            if(this.draggedPiece?.dataset.piece == "pawn" && this.draggedPiece?.dataset.color == "white" && targetSquare.dataset.y == "8"){
                this.rulesForPawns?.selectTakenWhitePiece().then(selectedImage => {
                    if (selectedImage) {
                        console.log("Selected image:", selectedImage.src);
                        document.getElementById("whitePiecesTaken")?.appendChild(this.draggedPiece as HTMLElement);
                        targetSquare.appendChild(selectedImage);

                    } else {
                        console.log("No selection made.");
                    }
                });
            }
            // if a black pawn reaches the other side of the board
            else if(this.draggedPiece?.dataset.piece == "pawn" && this.draggedPiece?.dataset.color == "black" && targetSquare.dataset.y == "1"){
                this.rulesForPawns?.selectTakenBlackPiece().then(selectedImage => {
                    if (selectedImage) {
                        console.log("Selected image:", selectedImage.src);
                        document.getElementById("blackPiecesTaken")?.appendChild(this.draggedPiece as HTMLElement);
                        targetSquare.appendChild(selectedImage);

                    } else {
                        console.log("No selection made.");
                    }
                });
            }
            /*
            const element1 = document.getElementById("SelectWhite");
            if (element1) {
                element1.remove(); // Removes the element from the DOM
            }
            const element2 = document.getElementById("SelectBlack");
            if (element2) {
                element2.remove(); // Removes the element from the DOM
            }*/
        }
    }
}