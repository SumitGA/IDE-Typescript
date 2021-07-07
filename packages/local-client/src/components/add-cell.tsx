import './add-cell.css';
import { useActions } from '../hooks/use-action';

interface AddCellProps {
	previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
	const { insertCellAfter } = useActions();
	return (
		<div className={`add-cell ${forceVisible && 'force-visible'}`}>
			<div className="add-buttons">
				<button
					className="button is-rounded is-primary is-normal"
					onClick={() => insertCellAfter(previousCellId, 'code')}
				>
					<span className="icon is-small">
						<i className="fas fa-plus" />
						Code
					</span>
				</button>
				<button
					className="button is-rounded is-primary is-normal"
					onClick={() => insertCellAfter(previousCellId, 'text')}
				>
					<span className="icon is-small">
            <i className="fas fa-plus" />
            Text
            </span>
				</button>
				<div className="divider" />
			</div>
		</div>
	);
};

export default AddCell;
