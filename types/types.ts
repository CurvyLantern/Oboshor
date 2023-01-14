export type letterState = 'correct' | 'misplaced' | 'wrong' | undefined;
export type GridCellType = {
	input: string;
	state: letterState;
};
export type GridRowType = [
	GridCellType,
	GridCellType,
	GridCellType,
	GridCellType,
	GridCellType,
	GridCellType
];
export type GridDataType = [GridRowType, GridRowType, GridRowType, GridRowType, GridRowType, GridRowType];
