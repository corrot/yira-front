import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableList = ({ list, funcs, ...rest }: IDraggableListProps) => {
	const onDragEnd = ({ source, destination }: any) => {
		if (!destination) return;

		funcs.swap('steps', source.index, destination.index);
	};

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{list.map((item, index) => (
								<Draggable key={`draggable-${index}`} draggableId={`draggable-${index}`} index={index}>
									{(p, s) => (
										<div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
											{item}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};

interface IDraggableListProps {
	list: any[];
	funcs: any;
}

export default DraggableList;
