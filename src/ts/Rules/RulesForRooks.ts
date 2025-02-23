export class RulesForRooks {
    // constructor
    constructor(){

    }
    public moveIsAllowed(elements: (HTMLElement | null)[][] | null, startSquare: HTMLElement, draggedPiece: HTMLElement, targetSquare: HTMLElement, targetPiece: HTMLElement | null): boolean {
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

        // Diagonal movement is illegal
        if(diffX != 0 && diffY != 0) return false;
        //console.log(diffY);
        if(elements){

            if(diffX > 0){
                console.log("diffX > 0");
                for(let x = startSquareX + 1; x <= targetSquareX; x++ ){
                    const currentSquare = elements[x][startSquareY];
                    if (currentSquare) {
                        if(x < targetSquareX && currentSquare.firstChild){
                            moveIsAllowed = false; break;
                        }
                        else if(x == targetSquareX){
                            if(!currentSquare.firstChild){
                                moveIsAllowed = true; break;
                            }
                            else if(currentSquare.firstChild){
                                if(targetPieceColor == draggedPieceColor){
                                    moveIsAllowed = false; break;
                                }
                                else {
                                    moveIsAllowed = true; break;
                                }
                            }
                        }
                    }
                }
            }

            if(diffX < 0){
                console.log("diffX < 0");
                for(let x = startSquareX - 1; x >= targetSquareX; x-- ){
                    const currentSquare = elements[x][startSquareY];
                    if (currentSquare) {
                        if(x > targetSquareX && currentSquare.firstChild){
                            moveIsAllowed = false; break;
                        }
                        else if(x == targetSquareX){
                            if(!currentSquare.firstChild){
                                moveIsAllowed = true; break;
                            }
                            else if(currentSquare.firstChild){
                                if(targetPieceColor == draggedPieceColor){
                                    moveIsAllowed = false; break;
                                }
                                else {
                                    moveIsAllowed = true; break;
                                }
                            }
                        }
                    }
                }
            }

            if(diffY > 0){
                for(let y = startSquareY + 1; y <= targetSquareY; y++ ){
                    console.log(`y: ${y}`);
                    const currentSquare = elements[startSquareX][y];
                    console.log(currentSquare);
                    if (currentSquare) {
                        console.log(`currentSquare.firstChild: ${currentSquare.firstChild}`);
                        console.log(`targetSquareY: ${targetSquareY}`);
                        if(y < targetSquareY && currentSquare.firstChild){
                            console.log("condition met");
                            moveIsAllowed = false; break;
                        }
                        else if(y == targetSquareY){
                            if(!currentSquare.firstChild){
                                moveIsAllowed = true; break;
                            }
                            else if(currentSquare.firstChild){
                                if(targetPieceColor == draggedPieceColor){
                                    moveIsAllowed = false; break;
                                }
                                else {
                                    moveIsAllowed = true; break;
                                }
                            }
                        }
                    }
                }
            }

            if(diffY < 0){
                for(let y = startSquareY - 1; y >= targetSquareY; y-- ){
                    const currentSquare = elements[startSquareX][y];
                    if (currentSquare) {
                        if(y > targetSquareY && currentSquare.firstChild){
                            moveIsAllowed = false; break;
                        }
                        else if(y == targetSquareY){
                            if(!currentSquare.firstChild){
                                moveIsAllowed = true; break;
                            }
                            else if(currentSquare.firstChild){
                                if(targetPieceColor == draggedPieceColor){
                                    moveIsAllowed = false; break;
                                }
                                else {
                                    moveIsAllowed = true; break;
                                }
                            }
                        }
                    }
                }
            }
        }
        return moveIsAllowed;
    }
}