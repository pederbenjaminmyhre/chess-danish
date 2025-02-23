export class RulesForBishops {
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
        let y = startSquareY;

        if(Math.abs(diffX) == Math.abs(diffY)) {
            if(elements){
                // drag up and to the right
                if(diffX > 0 && diffY > 0){
                    for(let x = startSquareX + 1; x <= targetSquareX; x++ ){
                        y=y+1;
                        const currentSquare = elements[x][y];
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
                // drag down and to the left
                if(diffX < 0 && diffY < 0){
                    for(let x = startSquareX - 1; x >= targetSquareX; x-- ){
                        y=y-1;
                        const currentSquare = elements[x][y];
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

                // drag down and to the right
                if(diffX > 0 && diffY < 0){
                    for(let x = startSquareX + 1; x <= targetSquareX; x++ ){
                        y=y-1;
                        const currentSquare = elements[x][y];
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

                // drag up and to the left
                if(diffX < 0 && diffY > 0){
                    for(let x = startSquareX - 1; x >= targetSquareX; x-- ){
                        y=y+1;
                        const currentSquare = elements[x][y];
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
            }
        }
        return moveIsAllowed;
    }
}