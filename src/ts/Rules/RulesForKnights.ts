export class RulesForKnights {
    // constructor
    constructor(){

    }
    public moveIsAllowed(elements: (HTMLElement | null)[][] | null, startSquare: HTMLElement, draggedPiece: HTMLElement, targetSquare: HTMLElement, targetPiece: HTMLElement | null): boolean {
        console.log("moveIsAllowed");
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

        if((diffX==1 && diffY== 2) || (diffX==2 && diffY==1) || (diffX==2 && diffY==-1 ) || (diffX==1 && diffY==-2) || (diffX==-1 && diffY==-2) || (diffX==-2 && diffY==-1) || (diffX==-2 && diffY==1) || (diffX==-1 && diffY==2)){
            console.log(diffX);
            console.log(diffY);
            if (targetSquareX != null && targetSquareY != null ){
                if (targetSquare.firstChild){
                    if (targetPieceColor != draggedPieceColor){
                        moveIsAllowed = true;
                    }
                }
                else {
                    moveIsAllowed = true;
                }
            }
        }

        return moveIsAllowed;
    }
}